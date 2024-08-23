package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PurchaseC struct {
	ID           string           `json:"-"`
	UserID       string           `json:"-"`
	SupplierID   string           `json:"supplierID"`
	ArticleBoxID string           `json:"articleBoxID"`
	Code         string           `json:"code"`
	Total        string           `json:"total"`
	CreatedAt    string           `json:"date"`
	Detail       []PurchaseDetail `json:"detail"`
}

type PurchaseDetail struct {
	ArticleID string `json:"id"`
	Price     string `json:"price"`
	Quantity  string `json:"quantity"`
	Subtotal  string `json:"subtotal"`
}

func (purchase PurchaseC) Save(c *fiber.Ctx) error {
	_ = c.BodyParser(&purchase)
	code, _ := strconv.Atoi(purchase.Code)
	total, _ := strconv.ParseFloat(purchase.Total, 64)
	newId := uuid.NewString()
	info := config.DB.Create(&models.Purchases{
		ID:           newId,
		UserID:       c.Locals("userId").(string),
		SupplierID:   purchase.SupplierID,
		ArticleBoxID: purchase.ArticleBoxID,
		Code:         code,
		Total:        total,
		CreatedAt:    time.Now(),
	})
	if info.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	for _, value := range purchase.Detail {
		//fmt.Println(key, value)
		quan, _ := strconv.Atoi(value.Quantity)
		subtotal, _ := strconv.ParseFloat(value.Subtotal, 64)
		price, _ := strconv.ParseFloat(value.Price, 64)
		config.DB.Create(&models.DetailPurchase{
			ID:         uuid.NewString(),
			PurchaseID: newId,
			ArticleID:  value.ArticleID,
			Price:      price,
			Quantity:   quan,
			Subtotal:   subtotal,
			CreatedAt:  time.Now(),
		})

		type Perz struct {
			Stock     int
			SalePrice float64
		}
		var perz Perz
		config.DB.Model(models.Articles{}).
			Select("stock, purchase_price").
			Where("id = ?", value.ArticleID).
			First(&perz)

		perz.Stock += quan
		perz.SalePrice = price
		info := config.DB.Model(models.Articles{}).
			Where("id = ?", value.ArticleID).
			Select("stock", "sale_price").
			Updates(perz)
		fmt.Println(info.RowsAffected)

	}
	return c.JSON(purchase)
}
