package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type SaleC struct {
	ID            string `json:"id"`
	UserID        string `json:"-"`
	CostumerID    string `json:"costumerID"`
	Code          string `json:"code"`
	State         string `json:"state"`
	DiscountTotal string `json:"discountTotal"`
	Neto          string `json:"neto"`
	Total         string `json:"total"`
	CreatedAt     string `json:"date"`

	Costumer Costumer `json:"costumer"`

	DetailSale []DetailSale `json:"detail" gorm:"foreignkey:SaleID"`

	Array []SaleC      `json:"-" gorm:"-"`
	Model models.Sales `json:"-" gorm:"-"`
}

type Costumer struct {
	ID   string `json:"-"`
	Name string `json:"name"`
}

type DetailSale struct {
	ID        string `json:"-"`
	SaleID    string `json:"-"`
	ArticleID string `json:"id"`
	Price     string `json:"price"`
	Discount  string `json:"discount"`
	Quantity  string `json:"quantity"`
	Subtotal  string `json:"subtotal"`

	Article Articles `json:"article"`
}

func (sale SaleC) All(f *fiber.Ctx) error {
	db := config.DB.Model(sale.Model)
	var count int64
	var q types.ParamsTable
	_ = f.QueryParser(&q)
	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Preload("Costumer").
		Order("created_at DESC").
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&sale.Array)
	} else {
		db.Where("LOWER(code) LIKE LOWER(?)", "%"+q.Search+"%").
			Find(&sale.Array)
	}
	db.Count(&count)
	data := make([]interface{}, count)
	for i, v := range sale.Array {
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

func (sale SaleC) GetNewCode(c *fiber.Ctx) error {
	var maxCode int
	config.DB.Model(models.Sales{}).Select("MAX(code)").Scan(&maxCode)
	return c.JSON(types.Response{
		Status: true,
		Find:   maxCode + 1,
	})
}

func (sale SaleC) Save(f *fiber.Ctx) error {
	_ = f.BodyParser(&sale)
	code, _ := strconv.Atoi(sale.Code)
	total, _ := strconv.ParseFloat(sale.Total, 64)
	neto, _ := strconv.ParseFloat(sale.Neto, 64)
	discountTotal, _ := strconv.ParseFloat(sale.DiscountTotal, 64)
	newIdSale := uuid.NewString()
	info := config.DB.Create(&models.Sales{
		ID:            newIdSale,
		CostumerID:    sale.CostumerID,
		Code:          code,
		State:         0,
		DiscountTotal: discountTotal,
		Neto:          neto,
		Total:         total,
	})
	if info.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	for _, value := range sale.DetailSale {
		quan, _ := strconv.Atoi(value.Quantity)
		subtotal, _ := strconv.ParseFloat(value.Subtotal, 64)
		discount, _ := strconv.ParseFloat(value.Discount, 64)
		config.DB.Create(&models.DetailSale{
			ID:        uuid.NewString(),
			SaleID:    newIdSale,
			ArticleID: value.ArticleID,
			Amount:    quan,
			Discount:  discount,
			Subtotal:  subtotal,
			CreatedAt: time.Now(),
		})

		perz := struct{ Stock int }{}
		config.DB.
			Model(models.Articles{}).
			Select("stock, sale_price").
			Where("id = ?", value.ArticleID).
			First(&perz)

		perz.Stock -= quan
		config.DB.
			Model(models.Articles{}).
			Where("id = ?", value.ArticleID).
			Select("stock", "sale_price").
			Updates(perz)
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Venta guardada",
	})
}
