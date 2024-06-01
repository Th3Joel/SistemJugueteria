package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"math"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ProveedorC struct {
	ID      string `json:"id,omitempty"`
	Name    string `json:"name,omitempty" validate:"required,isRepeat"`
	Address string `json:"address,omitempty" validate:"lte=50"`
	Phone   string `json:"phone,omitempty" validate:"numeric"`
	Email   string `json:"email,omitempty" validare:"email"`
}

type ResponseP struct {
	Status bool        `json:"status"`
	Find   *ProveedorC `json:"find,omitempty"`
	Msj    string      `json:"msj,omitempty"`
	All    *allP       `json:"all,omitempty"`
}
type allP struct {
	Data     []ProveedorC `json:"data"`
	Count    int          `json:"count"`
	Pages    int          `json:"pages"`
	Page     int          `json:"page"`
	PageSize int
}

func (ProveedorC) All(c *fiber.Ctx) error {
	type QueriesParams struct {
		Page     int    `query:"page"`
		PageSize int    `query:"pageSize"`
		Search   string `query:"search"`
	}
	var providers []models.Suppliers
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	q := new(QueriesParams)
	c.QueryParser(q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	config.DB.Offset(skip).Limit(take).Find(&providers)
	count := len(providers)

	//Rellena la vista
	data := []ProveedorC{}
	for _, provider := range providers {
		data = append(data, ProveedorC{
			ID:      provider.ID,
			Email:   provider.Email,
			Name:    provider.Name,
			Address: provider.Address,
			Phone:   provider.Phone,
		})
	}

	return c.Status(200).JSON(ResponseP{
		Status: true,
		All: &allP{
			Data:     data,
			Count:    count,
			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})
}

func (ProveedorC) ShowId(c *fiber.Ctx) error {
	id := c.Params("id")

	useModel := models.Suppliers{ID: id}
	sql := config.DB.Select("id", "email", "name", "address", "phone").First(&useModel)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(ResponseP{
			Status: false,
			Msj:    "Proveedor no encontrado",
		})
	}

	return c.Status(200).JSON(ResponseP{
		Status: true,
		Find: &ProveedorC{
			Email:   useModel.Email,
			Name:    useModel.Name,
			Address: useModel.Address,
			Phone:   useModel.Phone,
		},
	})
}

func (p ProveedorC) Save(c *fiber.Ctx) error {
	provider := ProveedorC{}

	//Pasar el body a la estructura
	c.BodyParser(&provider)
	p.trim(&provider)

	provider.ID = uuid.NewString()

	sql := config.DB.Create(models.Suppliers{
		ID:       provider.ID,
		Email:    provider.Email,
		Name:     provider.Name,
		Address:  provider.Address,
		Phone:    provider.Phone,
		UpdateAt: time.Now(),
	})
	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(ResponseP{
			Status: false,
			Msj:    "No se pudo crear el proveedor",
		})
	}

	return c.Status(200).JSON(Response{
		Status: true,
		Msj:    "Proveedor creado",
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (p ProveedorC) UpdateId(c *fiber.Ctx) error {

	id := c.Params("id")
	proveedorBody := ProveedorC{}

	proveedorFound := models.Suppliers{ID: id}
	c.BodyParser(&proveedorBody)
	p.trim(&proveedorBody) //Eliminar los espacios en blanco
	sql := config.DB.First(&proveedorFound)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Proveedor no encontrado",
		})
	}

	config.DB.Model(proveedorFound).Updates(proveedorBody)

	return c.JSON(ResponseP{
		Status: true,
		Msj:    "Proveedor actualizado correctamente",
	})
}

func (ProveedorC) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	proveedor := models.Suppliers{ID: id}
	sql := config.DB.Delete(proveedor)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Proveedor no encontrado",
		})
	}

	return c.JSON(fiber.Map{
		"status": true,
		"msj":    "Proveedor eliminado",
	})
}

func (ProveedorC) trim(u *ProveedorC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Address = strings.TrimSpace(u.Address)
	u.Phone = strings.TrimSpace(u.Phone)
}
