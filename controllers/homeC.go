package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"

	"github.com/gofiber/fiber/v2"
)

type HomeC struct {
	CostumersCount int64   `json:"costumersCount"`
	SuppliersCount int64   `json:"suppliersCount"`
	UsersCount     int64   `json:"usersCount"`
	TotalPurchases float64 `json:"totalPurchases"`
	TotalSales     float64 `json:"totalSales"`
}

func (hc HomeC) CountersBox(f *fiber.Ctx) error {

	config.DB.Model(models.Costumers{}).Count(&hc.CostumersCount)
	config.DB.Model(models.Suppliers{}).Count(&hc.SuppliersCount)
	config.DB.Model(models.Users{}).Count(&hc.UsersCount)
	config.DB.Model(models.Purchases{}).Select("SUM(total) as totalPurchases").Scan(&hc.TotalPurchases)
	config.DB.Model(models.Sales{}).Select("SUM(total) as totalSales").Scan(&hc.TotalSales)

	return f.JSON(types.Response{
		Status: true,
		Find:   hc,
	})
}
