package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"github.com/gofiber/fiber/v2"
	"strings"
)

type CompanyC struct {
	//Data
	Name    string `json:"name"`
	Email   string `json:"email,omitempty"`
	Ruc     string `json:"ruc,omitempty"`
	Phone   string `json:"phone,omitempty"`
	Address string `json:"address,omitempty"`
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
