package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"math"
	"strings"
)

type SupplierC struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Address string `json:"address,omitempty"`
	Phone   string `json:"phone,omitempty"`
	Email   string `json:"email,omitempty"`

	Model models.Suppliers `gorm:"-" json:"-"`
	Array []SupplierC      `gorm:"-" json:"-"`
}

func (supplier SupplierC) All(c *fiber.Ctx) error {
	db := config.DB.Model(supplier.Model)
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&supplier.Array)
	} else {
		db.Where("name LIKE ?", "%"+q.Search+"%").
			Find(&supplier.Array)
	}
	db.Count(&count)

	data := make([]interface{}, count)
	for i, v := range supplier.Array {
		data[i] = v
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		All: &types.All{
			Data:     data,
			Count:    count,
			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})
}

func (supplier SupplierC) ShowId(c *fiber.Ctx) error {
	db := config.DB.Model(supplier.Model)
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		First(&supplier)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Proveedor no encontrado",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Find:   supplier,
	})
}

func (supplier SupplierC) Save(c *fiber.Ctx) error {
	db := config.DB

	//Pasar el body a la estructura
	_ = c.BodyParser(&supplier)
	supplier.trim(&supplier)

	supplier.ID = uuid.NewString()

	sql := db.Create(&models.Suppliers{
		ID:      supplier.ID,
		Email:   supplier.Email,
		Name:    supplier.Name,
		Address: supplier.Address,
		Phone:   supplier.Phone,
	})
	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Proveedor creado",
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (supplier SupplierC) UpdateId(c *fiber.Ctx) error {
	db := config.DB.Model(supplier.Model)
	id := c.Params("id")

	_ = c.BodyParser(&supplier)
	supplier.trim(&supplier) //Eliminar los espacios en blanco

	db.
		Where("id = ?", id).
		Updates(supplier)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Proveedor actualizado correctamente",
	})
}

func (supplier SupplierC) Delete(c *fiber.Ctx) error {
	db := config.DB
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		Delete(&supplier.Model)
	if sql.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Proveedor no encontrado",
		})
	}

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Proveedor eliminado",
	})
}

func (SupplierC) trim(u *SupplierC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Address = strings.TrimSpace(u.Address)
	u.Phone = strings.TrimSpace(u.Phone)
}
