package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type CompanyC struct {
	//Data
	Name    string `json:"Name"`
	Email   string `json:"Email"`
	Ruc     string `json:"Ruc"`
	Phone   string `json:"Phone"`
	Address string `json:"Address"`
	//Settings
	Model models.Company `gorm:"-" json:"-"`
}

func (company CompanyC) Show(f *fiber.Ctx) error {
	db := config.DB.Model(company.Model)
	db.Where("id = 1").
		First(&company)
	return f.JSON(types.Response{
		Status: true,
		Find:   company,
	})
}

func (company CompanyC) Update(f *fiber.Ctx) error {
	db := config.DB.Model(company.Model)
	_ = f.BodyParser(&company)
	company.trim(&company)
	db.
		Where("id = 1").
		Select("name", "email", "ruc", "phone", "address").
		Updates(company)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Actualizado correctamente",
		Find:   company,
	})
}

func (CompanyC) trim(u *CompanyC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Ruc = strings.TrimSpace(u.Ruc)
	u.Phone = strings.TrimSpace(u.Phone)
	u.Address = strings.TrimSpace(u.Address)
}
