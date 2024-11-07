package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
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
	return f.JSON(types.Response{
		Status: true,
		Find:   company,
	})
}

func (company CompanyC) Update(f *fiber.Ctx) error {
	filesH := helpers.FilesH{Path: "uploads"}
	db := config.DB.Model(company.Model)
	_ = f.BodyParser(&company)
	company.trim(&company)
	file, _ := f.FormFile("file0")
	if file != nil {
		parts := strings.Split(file.Filename, ".")
		filename := "logo." + parts[1]
		//f.SaveFile(file, path)
		err := filesH.SaveFile(filename, file)
		if !err {
			return f.JSON(types.Response{
				Status: false,
				Msj:    "Error al guardar el archivo",
			})
		}
		company.Logo = filename
	}
	db.
		Where("id = 1").
		//Select("name", "email", "ruc", "phone", "address", "logo", "price_dollar").
		Updates(company)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Actualizado correctamente",
		Find:   company,
	})
}
func (company CompanyC) File(f *fiber.Ctx) error {
	config.DB.Model(company.Model).Where("id = 1").First(&company)
	filesH := helpers.FilesH{Path: "uploads"}
	logo, err := filesH.GetFile(company.Logo)
	if !err {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No hay logo",
		})
	}
	parts := strings.Split(company.Logo, ".")
	if parts[1] == "svg" {
		parts[1] = "svg+xml"
	}
	f.Set("Content-type", "image/"+parts[1])
	return f.Send(logo)
}
func (CompanyC) trim(u *CompanyC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Ruc = strings.TrimSpace(u.Ruc)
	u.Phone = strings.TrimSpace(u.Phone)
	u.Address = strings.TrimSpace(u.Address)
}
