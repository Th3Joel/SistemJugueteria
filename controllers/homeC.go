package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"

	"github.com/gofiber/fiber/v2"
)

type HomeC struct {
	CostumersCount int64 `json:"costumersCount"`
	SuppliersCount int64 `json:"suppliersCount"`
	UsersCount     int64 `json:"usersCount"`
	PurchasesCount int64 `json:"purchasesCount"`
	SalesCount     int64 `json:"salesCount"`
}

func (hc HomeC) CountersBox(f *fiber.Ctx) error {

	config.DB.Model(models.Costumers{}).Count(&hc.CostumersCount)
	config.DB.Model(models.Suppliers{}).Count(&hc.SuppliersCount)
	config.DB.Model(models.Users{}).Count(&hc.UsersCount)
	config.DB.Model(models.Purchases{}).Count(&hc.PurchasesCount)
	config.DB.Model(models.Sales{}).Count(&hc.SalesCount)

	return f.JSON(types.Response{
		Status: true,
		Find:   hc,
	})
}
