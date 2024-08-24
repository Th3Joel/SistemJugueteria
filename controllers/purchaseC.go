package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"math"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PurchaseC struct {
	ID             string           `json:"id"`
	UserID         string           `json:"-"`
	SupplierID     string           `json:"supplierID"`
	ArticleBoxID   string           `json:"articleBoxID"`
	Code           string           `json:"code"`
	Total          string           `json:"total"`
	CreatedAt      string           `json:"date"`
	Supplier       Supplier         `json:"supplier"`
	ArticleBox     ArticlesBox      `json:"articleBox"`
	DetailPurchase []DetailPurchase `json:"detail" gorm:"foreignkey:PurchaseID"`
	Model          models.Purchases `json:"-" gorm:"-"`
	Array          []PurchaseC      `json:"-" gorm:"-"`
}
type Supplier struct {
	ID   string `json:"-"`
	Name string `json:"name"`
}
type ArticlesBox struct {
	ID            string  `json:"-"`
	Description   string  `json:"description"`
	PurchasePrice float64 `json:"purchasePrice"`
}
type DetailPurchase struct {
	ID         string `json:"-"`
	PurchaseID string `json:"-"`
	ArticleID  string `json:"id"`
	Price      string `json:"price"`
	Quantity   string `json:"quantity"`
	Subtotal   string `json:"subtotal"`

	Article Articles `json:"article"`
}
type Articles struct {
	ID          string `json:"-"`
	Code        string `json:"code"`
	Description string `json:"description"`
}

func (purchase PurchaseC) GetNewCode(c *fiber.Ctx) error {
	var maxCode int
	config.DB.Model(models.Purchases{}).Select("MAX(code)").Scan(&maxCode)
	return c.JSON(types.Response{
		Status: true,
		Find:   maxCode + 1,
	})
}

func (purchase PurchaseC) All(f *fiber.Ctx) error {
	var count int64
	db := config.DB.Model(purchase.Model)
	var q types.ParamsTable

	_ = f.QueryParser(&q)
	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.Preload("Supplier").
		Preload("ArticleBox").
		Order("created_at DESC").
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&purchase.Array)
	} else {
		db.Where("LOWER(code) LIKE LOWER(?)", "%"+q.Search+"%").
			Find(&purchase.Array)
	}
	db.Count(&count)

	data := make([]interface{}, count)
	for i, v := range purchase.Array {
		data[i] = v
	}

	return f.Status(200).JSON(types.Response{
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

func (purchase PurchaseC) Save(f *fiber.Ctx) error {
	_ = f.BodyParser(&purchase)
	code, _ := strconv.Atoi(purchase.Code)
	total, _ := strconv.ParseFloat(purchase.Total, 64)
	newId := uuid.NewString()
	info := config.DB.Create(&models.Purchases{
		ID:           newId,
		UserID:       f.Locals("userId").(string),
		SupplierID:   purchase.SupplierID,
		ArticleBoxID: purchase.ArticleBoxID,
		Code:         code,
		Total:        total,
		CreatedAt:    time.Now(),
	})
	if info.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	for _, value := range purchase.DetailPurchase {
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
			Select("stock, sale_price").
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
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Compra guardada",
	})
}

func (purchase PurchaseC) ShowId(f *fiber.Ctx) error {
	id := f.Params("id")

	config.DB.Model(models.Purchases{}).
		Preload("Supplier").
		Preload("ArticleBox").
		Preload("DetailPurchase.Article").
		Where("id = ?", id).
		First(&purchase)
	return f.JSON(types.Response{
		Status: true,
		Find:   purchase,
	})
}
