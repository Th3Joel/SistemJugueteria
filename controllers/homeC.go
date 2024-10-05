package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"time"

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
	time := time.Now().Format("2006-01-02")
	config.DB.Model(models.Purchases{}).
		Select("COALESCE(SUM(total),0.0) as totalPurchases").
		Where("DATE_FORMAT(created_at, '%Y-%m-%d') = ?", time).
		Scan(&hc.TotalPurchases)
	config.DB.Model(models.Sales{}).
		Select("COALESCE(SUM(total),0.0) as totalSales").
		Where("DATE_FORMAT(created_at, '%Y-%m-%d') = ?", time).
		Scan(&hc.TotalSales)

	return f.JSON(types.Response{
		Status: true,
		Find:   hc,
	})
}

func (HomeC) GetTotalSales(f *fiber.Ctx) error {

	data := []struct {
		Time        string  `json:"time"`
		TotalVentas float64 `json:"total_ventas"`
	}{}

	config.DB.
		Model(models.Sales{}).
		Select("DATE_FORMAT(created_at, '%Y-%m') as time,SUM(neto) AS total_ventas").
		Group("time").
		Scan(&data)

	return f.JSON(types.Response{
		Status: true,
		Find:   data,
	})
}
