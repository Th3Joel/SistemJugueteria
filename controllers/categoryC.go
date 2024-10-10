package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CategoryC struct {
	ID          string          `json:"id"`
	Name        string          `json:"Name"`
	Description string          `json:"Description"`
	Model       models.Category `gorm:"-" json:"-"`
	Array       []CategoryC     `gorm:"-" json:"-"`
}

func (category CategoryC) AllSelect(f *fiber.Ctx) error {
	db := config.DB.Model(category.Model)

	db.Find(&category.Array)

	type Perz struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	}

	var custom []Perz
	for _, v := range category.Array {
		custom = append(custom, Perz{
			ID:   v.ID,
			Name: v.Name,
		})
	}

	return f.JSON(custom)

}

func (category CategoryC) All(c *fiber.Ctx) error {
	db := config.DB.Model(category.Model)
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&category.Array)
	} else {
		db.Where("LOWER(name) LIKE LOWER(?)", "%"+q.Search+"%").
			Find(&category.Array)
	}
	config.DB.Model(category.Model).Select("COUNT(id) AS count").Count(&count)
	data := make([]interface{}, len(category.Array))
	for i, v := range category.Array {
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

func (category CategoryC) ShowId(c *fiber.Ctx) error {
	db := config.DB.Model(category.Model)
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		First(&category)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Categoría no encontrado",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Find:   category,
	})
}

func (category CategoryC) Save(c *fiber.Ctx) error {
	db := config.DB

	//Pasar el body a la estructura
	_ = c.BodyParser(&category)
	category.trim(&category)
	category.ID = uuid.NewString()

	sql := db.Create(&models.Category{
		ID:          category.ID,
		Name:        category.Name,
		Description: category.Description,
	})
	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	return c.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Categoría creada",
	})
}

func (category CategoryC) UpdateId(c *fiber.Ctx) error {
	db := config.DB.Model(category.Model)
	id := c.Params("id")

	_ = c.BodyParser(&category)
	category.trim(&category) //Eliminar los espacios en blanco

	db.
		Where("id = ?", id).
		Select("name", "description").
		Updates(category)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Categoría actualizada correctamente",
	})
}

func (category CategoryC) Delete(c *fiber.Ctx) error {
	db := config.DB
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		Delete(category.Model)
	if sql.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Categoría no encontrada",
		})
	}

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Categoría eliminada",
	})
}

func (CategoryC) trim(u *CategoryC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Description = strings.TrimSpace(u.Description)
}
