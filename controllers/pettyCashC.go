package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"

	"github.com/gofiber/fiber/v2"
)

type PettyCashC struct {
	InitialBalance string           `json:"InitialBalance"`
	Balance        string           `json:"balance"`
	Limit          string           `json:"Limit"`
	Model          models.PettyCash `json:"-" gorm:"-"`
}

func (c PettyCashC) Show(f *fiber.Ctx) error {
	config.DB.Model(c.Model).
		First(&c)
	return f.JSON(types.Response{
		Status: true,
		Find:   c,
	})
}

func (c PettyCashC) Update(f *fiber.Ctx) error {
	_ = f.BodyParser(&c)
	sql := config.DB.Model(c.Model).
		Where("id = ?", 1).
		Updates(types.Json{
			"initial_balance": c.InitialBalance,
			"limit":           c.Limit,
		})
	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se ha actualizado los datos",
		})
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Datos actualizados",
	})
}
