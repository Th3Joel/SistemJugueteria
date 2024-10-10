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

type SaleC struct {
	ID            string `json:"id"`
	UserID        string `json:"-"`
	CostumerID    string `json:"costumerID"`
	Code          string `json:"code"`
	State         string `json:"state"`
	DiscountTotal string `json:"discountTotal"`
	Neto          string `json:"neto"`
	Total         string `json:"total"`
	CashCordoba   string `json:"cashCordoba"`
	CashDollar    string `json:"cashDollar"`
	Exchange      string `json:"exchange"`
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
	ArticleID string `json:"articleId"`
	Discount  string `json:"discount"`
	Quantity  string `json:"quantity"`
	Subtotal  string `json:"subtotal"`

	Article Articles `json:"article"`
}

// func (sale SaleC) All(f *fiber.Ctx, my bool) error {
// 	db := config.DB.Model(sale.Model)
// 	userId := f.Locals("userId").(string)
// 	var count int64
// 	var q types.ParamsTable
// 	_ = f.QueryParser(&q)
// 	skip := (q.Page - 1) * q.PageSize
// 	take := q.PageSize
// 	db.
// 		Preload("Costumer").
// 		Order("created_at DESC").
// 		Offset(skip).
// 		Limit(take)

// 	if q.Search == "" {
// 		if my {
// 			db.Where("user_id = ?", userId).Find(&sale.Array)
// 		} else {
// 			db.Find(&sale.Array)
// 		}
// 	} else {
// 		search := "%" + q.Search + "%"
// 		if my {
// 			db.
// 				Where(`
// 				user_id = ?
// 				AND
// 				(
// 					costumer_id IN (
// 						SELECT id
// 						FROM costumers
// 						WHERE  LOWER(name) LIKE LOWER(?)
// 					)
// 					OR
// 					LOWER(code) LIKE LOWER(?)
// 					OR
// 					DATE(created_at) LIKE ?
// 					OR
// 					total LIKE ?
// 				)
// 		`, userId, search, search, search, search).
// 				Find(&sale.Array)

// 		} else {
// 			db.Where(`
// 			costumer_id IN (
// 				SELECT id
// 				FROM costumers
// 				WHERE  LOWER(name) LIKE LOWER(?)
// 			)
// 			OR
// 			LOWER(code) LIKE LOWER(?)
// 			OR
// 			DATE(created_at) LIKE ?
// 			OR
// 			total LIKE ?
// 		`, search, search, search, search).
// 				Find(&sale.Array)
// 		}
// 	}
// 	config.DB.Model(models.Sales{}).Select("COUNT(id) AS count").Where("user_id = ?", userId).Count(&count)

// 	data := make([]interface{}, len(sale.Array))
// 	for i, v := range sale.Array {
// 		data[i] = v
// 	}
// 	return f.Status(200).JSON(types.Response{
// 		Status: true,
// 		All: &types.All{
// 			Data:     data,
// 			Count:    count,
// 			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
// 			Page:     q.Page,
// 			PageSize: q.PageSize,
// 		},
// 	})
// }

func (sale SaleC) All(f *fiber.Ctx) error {
	db := config.DB.Model(sale.Model)
	userId := f.Locals("userId").(string)
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
		db.Where("user_id = ?", userId).Find(&sale.Array)
	} else {
		search := "%" + q.Search + "%"

		db.
			Where(`
				user_id = ?
				AND
				( 
					costumer_id IN ( 
						SELECT id 
						FROM costumers 
						WHERE  LOWER(name) LIKE LOWER(?)
					)
					OR
					LOWER(code) LIKE LOWER(?)
					OR
					DATE(created_at) LIKE ?
					OR
					total LIKE ?
				)
		`, userId, search, search, search, search).
			Find(&sale.Array)
	}
	config.DB.Model(sale.Model).Select("COUNT(id) AS count").Where("user_id = ?", userId).Count(&count)

	data := make([]interface{}, len(sale.Array))
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
	cashCordoba, _ := strconv.ParseFloat(sale.CashCordoba, 64)
	cashDollar, _ := strconv.ParseFloat(sale.CashDollar, 64)
	exchange, _ := strconv.ParseFloat(sale.Exchange, 64)
	info := config.DB.Create(&models.Sales{
		ID:             newIdSale,
		CashRegisterID: f.Locals("cashRegisterId").(string),
		UserID:         f.Locals("userId").(string),
		CostumerID:     sale.CostumerID,
		Code:           code,
		State:          0,
		DiscountTotal:  discountTotal,
		Neto:           neto,
		Total:          total,
		CashCordoba:    cashCordoba,
		CashDollar:     cashDollar,
		Exchange:       exchange,
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
			Quantity:  quan,
			Discount:  discount,
			Subtotal:  subtotal,
			CreatedAt: time.Now(),
		})
		fmt.Println(value)
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

func (sale SaleC) ShowId(f *fiber.Ctx) error {
	id := f.Params("id")
	userId := f.Locals("userId").(string)
	config.DB.Model(models.Sales{}).
		Preload("Costumer").
		Preload("DetailSale").
		Preload("DetailSale.Article").
		Where("id = ? AND user_id = ?", id, userId).First(&sale)
	return f.JSON(types.Response{
		Status: true,
		Find:   sale,
	})
}

func (sale SaleC) Cancel(f *fiber.Ctx) error {
	id := f.Params("id")
	userId := f.Locals("userId").(string)
	sql := config.DB.Model(models.Sales{}).
		Preload("Costumer").
		Preload("DetailSale").
		Where("id = ? AND user_id = ?", id, userId).
		First(&sale)

	if sale.State == "0" {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "La venta ya fue cancelada",
		})
	}

	fecha, err := time.Parse(time.RFC3339, sale.CreatedAt)
	if err != nil {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ocurrio un error en la fecha",
		})
	}
	fechaLimite := fecha.Add(48 * time.Hour)

	if fechaLimite.Before(time.Now()) {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Caducó el limite de anulación",
		})
	}

	sql.Update("state", 0)
	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se pudo cancelar la venta",
		})
	}

	for _, value := range sale.DetailSale {
		art := struct {
			Stock int
		}{}
		sql2 := config.DB.
			Model(models.Articles{}).
			Where("id = ?", value.ArticleID).
			First(&art)
		qua, _ := strconv.Atoi(value.Quantity)
		stockA := art.Stock + qua

		sql2.Update("stock", stockA)
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Venta cancelada",
	})
}
