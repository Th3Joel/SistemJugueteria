package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"math"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ClienteC struct {
	ID      string `json:"id,omitempty"`
	Name    string `json:"name,omitempty" validate:"required,isRepeat"`
	Address string `json:"address,omitempty" validate:"omitempty,lte=50"`
	Phone   string `json:"phone,omitempty" validate:"omitempty,numeric"`
	Email   string `json:"email,omitempty" validate:"omitempty,email"`
}

type ResponseC struct {
	Status bool      `json:"status"`
	Find   *ClienteC `json:"find,omitempty"`
	Msj    string    `json:"msj,omitempty"`
	All    *allC     `json:"all,omitempty"`
}
type allC struct {
	Data     []ClienteC `json:"data"`
	Count    int        `json:"count"`
	Pages    int        `json:"pages"`
	Page     int        `json:"page"`
	PageSize int
}

func (ClienteC) All(c *fiber.Ctx) error {
	type QueriesParams struct {
		Page     int    `query:"page"`
		PageSize int    `query:"pageSize"`
		Search   string `query:"search"`
	}
	var costumers []models.Costumers
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	q := new(QueriesParams)
	_ = c.QueryParser(q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	if q.Search == "" {
		config.DB.Offset(skip).Limit(take).Find(&costumers)
	} else {
		config.DB.Offset(skip).Limit(take).
			Where("LOWER(name) LIKE LOWER(?)", "%"+q.Search+"%").
			Find(&costumers)
	}
	count := len(costumers)

	//Rellena la vista
	var data []ClienteC
	data = []ClienteC{}
	for _, costumer := range costumers {
		data = append(data, ClienteC{
			ID:      costumer.ID,
			Name:    costumer.Name,
			Email:   costumer.Email,
			Address: costumer.Address,
			Phone:   costumer.Phone,
		})
	}

	return c.Status(200).JSON(ResponseC{
		Status: true,
		All: &allC{
			Data:     data,
			Count:    count,
			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})
}

func (ClienteC) ShowId(c *fiber.Ctx) error {
	id := c.Params("id")

	costumerModel := models.Costumers{ID: id}
	sql := config.DB.Select("id", "email", "name", "address", "phone").First(&costumerModel)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(ResponseC{
			Status: false,
			Msj:    "Proveedor no encontrado",
		})
	}

	return c.Status(200).JSON(ResponseC{
		Status: true,
		Find: &ClienteC{
			Name:    costumerModel.Name,
			Email:   costumerModel.Email,
			Address: costumerModel.Address,
			Phone:   costumerModel.Phone,
		},
	})
}

func (p ClienteC) Save(c *fiber.Ctx) error {
	costumer := ClienteC{}

	//Pasar el body a la estructura
	_ = c.BodyParser(&costumer)
	p.trim(&costumer)

	costumer.ID = uuid.NewString()

	sql := config.DB.Create(&models.Costumers{
		ID:      costumer.ID,
		Email:   costumer.Email,
		Name:    costumer.Name,
		Address: costumer.Address,
		Phone:   costumer.Phone,
	})
	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(ResponseC{
			Status: false,
			Msj:    "No se pudo crear el cliente",
		})
	}

	return c.Status(200).JSON(Response{
		Status: true,
		Msj:    "Cliente creado",
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (p ClienteC) UpdateId(c *fiber.Ctx) error {

	id := c.Params("id")
	costumerBody := ClienteC{}

	costumerFound := models.Costumers{ID: id}
	_ = c.BodyParser(&costumerBody)
	p.trim(&costumerBody) //Eliminar los espacios en blanco
	sql := config.DB.First(&costumerFound)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Cliente no encontrado",
		})
	}

	config.DB.Model(costumerFound).Updates(costumerBody)

	return c.JSON(ResponseC{
		Status: true,
		Msj:    "Cliente actualizado correctamente",
	})
}

func (ClienteC) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	costumer := models.Costumers{ID: id}
	sql := config.DB.Delete(costumer)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Cliente no encontrado",
		})
	}

	return c.JSON(fiber.Map{
		"status": true,
		"msj":    "Cliente eliminado",
	})
}

func (ClienteC) trim(u *ClienteC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Address = strings.TrimSpace(u.Address)
	u.Phone = strings.TrimSpace(u.Phone)
}
