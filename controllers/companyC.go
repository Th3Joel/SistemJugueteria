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
	Name        string  `json:"Name"`
	Email       string  `json:"Email"`
	Ruc         string  `json:"Ruc"`
	Phone       string  `json:"Phone"`
	Address     string  `json:"Address"`
	Logo        string  `json:"Logo"`
	PriceDollar float64 `json:"PriceDollar"`
	//Settings
	Model models.Company `gorm:"-" json:"-"`
}

func (company CompanyC) Show(f *fiber.Ctx) error {
	db := config.DB.Model(company.Model)
	db.Where("id = 1").
		First(&company)
	company.Logo = "/api/settings/company/logo"
	return f.JSON(types.Response{
		Status: true,
		Find:   company,
	})
}

func (company CompanyC) Update(f *fiber.Ctx) error {

	db := config.DB.Model(company.Model)
	_ = f.BodyParser(&company)
	company.trim(&company)
	file, _ := f.FormFile("file0")
	if file != nil {
		parts := strings.Split(file.Filename, ".")
		path := "uploads/logo." + parts[1]
		f.SaveFile(file, path)
		company.Logo = path
	}
	db.
		Where("id = 1").
		Select("name", "email", "ruc", "phone", "address", "logo", "price_dollar").
		Updates(company)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Actualizado correctamente",
		Find:   company,
	})
}
func (company CompanyC) File(f *fiber.Ctx) error {
	config.DB.Model(company.Model).Where("id = 1").First(&company)
	return f.SendFile(company.Logo)
}
func (CompanyC) trim(u *CompanyC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Ruc = strings.TrimSpace(u.Ruc)
	u.Phone = strings.TrimSpace(u.Phone)
	u.Address = strings.TrimSpace(u.Address)
}
