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
	ID              string           `json:"id"`
	UserID          string           `json:"-"`
	SupplierID      string           `json:"supplierID"`
	ArticleBoxID    string           `json:"articleBoxID"`
	CostBox         string           `gorm:"-"`
	QuantityBox     string           `gorm:"-"`
	TotalToysDetail string           `json:"totalToysDetail" gorm:"-"`
	State           int              `json:"state"`
	PurchasePrice   float64          `json:"purchase_price"`
	ToysQuantity    int64            `json:"toys_quantity"`
	Code            string           `json:"code"`
	Total           string           `json:"total"`
	CreatedAt       string           `json:"date"`
	Supplier        Supplier         `json:"supplier"`
	ArticleBox      ArticlesBox      `json:"articleBox"`
	DetailPurchase  []DetailPurchase `json:"detail" gorm:"foreignkey:PurchaseID"`
	Model           models.Purchases `json:"-" gorm:"-"`
	Array           []PurchaseC      `json:"-" gorm:"-"`
}
type Supplier struct {
	ID      string `json:"-"`
	Company string `json:"company"`
	Name    string `json:"name"`
}
type ArticlesBox struct {
	ID            string  `json:"-"`
	Description   string  `json:"description"`
	PurchasePrice float64 `json:"purchasePrice"`
	ToysQuantity  int64   `json:"toysQuantity"`
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
	ID            string `json:"-"`
	Code          string `json:"code"`
	Description   string `json:"description"`
	PurchasePrice string `json:"purchase_price"`
	SalePrice     string `json:"price"`
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
		search := "%" + q.Search + "%"
		db.Where(`
		LOWER(code) LIKE LOWER(?)
		OR
		DATE(created_at) LIKE ?
		OR
		total LIKE ?
		OR
		supplier_id IN (
			SELECT id 
			FROM suppliers 
			WHERE  LOWER(name) LIKE LOWER(?)
		)
			OR
			article_box_id IN (
				SELECT id 
				FROM articles_boxes 
				WHERE  LOWER(description) LIKE LOWER(?)
			)
		OR
		(case
			 	WHEN 'completada' LIKE ? THEN '1'
				WHEN 'incompleta' LIKE ? THEN '0'
			 END) = state
		`, search, search, search, search, search, search, search).
			Find(&purchase.Array)
	}
	config.DB.Model(purchase.Model).Select("COUNT(id) AS count").Count(&count)

	data := make([]interface{}, len(purchase.Array))
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

	costBox, _ := strconv.ParseFloat(purchase.CostBox, 64)
	quantityBox, _ := strconv.Atoi(purchase.QuantityBox)
	purchasePriceArticle := costBox / float64(quantityBox)

	state := 0
	totalToysDetail, _ := strconv.Atoi(purchase.TotalToysDetail)

	if int64(totalToysDetail) >= int64(quantityBox) {
		state = 1
	}

	info := config.DB.Create(&models.Purchases{
		ID:            newId,
		UserID:        f.Locals("userId").(string),
		SupplierID:    purchase.SupplierID,
		ArticleBoxID:  purchase.ArticleBoxID,
		State:         state,
		PurchasePrice: costBox,
		ToysQuantity:  int64(quantityBox),
		Code:          code,
		Total:         total,
		CreatedAt:     time.Now(),
	})
	if info.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	// config.DB.
	// 	Where("id = ?", purchase.ArticleBoxID).
	// 	Select("purchase_price", "toys_quantity").
	// 	Updates(models.ArticlesBox{
	// 		PurchasePrice: costBox,
	// 		ToysQuantity:  int64(quantityBox),
	// 	})
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

		perz := struct {
			Stock         int
			SalePrice     float64
			PurchasePrice float64
		}{}
		config.DB.
			Model(models.Articles{}).
			Select("stock, sale_price", "purchase_price").
			Where("id = ?", value.ArticleID).
			First(&perz)

		perz.Stock += quan
		perz.SalePrice = price
		perz.PurchasePrice = purchasePriceArticle

		config.DB.
			Model(models.Articles{}).
			Where("id = ?", value.ArticleID).
			Select("stock", "sale_price", "purchase_price").
			Updates(perz)

	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Compra guardada",
	})
}
func (purchase PurchaseC) Update(f *fiber.Ctx) error {
	id := f.Params("id")
	anteData := PurchaseC{}
	_ = f.BodyParser(&purchase)

	sql := config.DB.
		Model(models.Purchases{}).
		Preload("ArticleBox").
		Preload("DetailPurchase.Article").
		Where("id = ?", id).
		First(&anteData)

	findIndex := func(array []DetailPurchase, query string) int {
		for i, v := range array {
			if v.Article.Description == query {
				return i
			}
		}
		return -1
	}

	totalToysDetail, _ := strconv.Atoi(purchase.TotalToysDetail)
	if int64(totalToysDetail) >= anteData.ArticleBox.ToysQuantity {
		fmt.Println("Compra completada")
		sql.Update("state", 1)
	}
	sql.Update("total", purchase.Total)
	purchasePriceArticle := anteData.ArticleBox.PurchasePrice / float64(anteData.ArticleBox.ToysQuantity)
	for _, value := range purchase.DetailPurchase {
		f := findIndex(anteData.DetailPurchase, value.Article.Description)
		if f == -1 {
			quan, _ := strconv.Atoi(value.Quantity)
			subtotal, _ := strconv.ParseFloat(value.Subtotal, 32)
			price, _ := strconv.ParseFloat(value.Price, 32)
			config.DB.Create(&models.DetailPurchase{
				ID:         uuid.NewString(),
				PurchaseID: anteData.ID,
				ArticleID:  value.ArticleID,
				Price:      price,
				Quantity:   quan,
				Subtotal:   subtotal,
				CreatedAt:  time.Now(),
			})

			perz := struct {
				Stock         int
				SalePrice     float64
				PurchasePrice float64
			}{}

			config.DB.
				Model(models.Articles{}).
				Select("stock, sale_price", "purchase_price").
				Where("id = ?", value.ArticleID).
				First(&perz)

			perz.Stock += quan
			perz.SalePrice = price
			perz.PurchasePrice = purchasePriceArticle

			config.DB.
				Model(models.Articles{}).
				Where("id = ?", value.ArticleID).
				Select("stock", "sale_price", "purchase_price").
				Updates(perz)

		} else {
			idDetail := anteData.DetailPurchase[f].ID
			quatityDetail, _ := strconv.Atoi(anteData.DetailPurchase[f].Quantity)
			valueQuantity, _ := strconv.Atoi(value.Quantity)
			quantity := quatityDetail + valueQuantity

			subtotalDetail, _ := strconv.ParseFloat(anteData.DetailPurchase[f].Subtotal, 32)
			subtotalValue, _ := strconv.ParseFloat(value.Subtotal, 32)
			subtotal := subtotalDetail + subtotalValue

			config.DB.
				Model(models.DetailPurchase{}).
				Where("id = ?", idDetail).
				Update("quantity", quantity).
				Update("subtotal", subtotal)

			fmt.Printf("Subtotal: %f", subtotal)
			fmt.Printf("quantity %d", quantity)

			articleId := anteData.DetailPurchase[f].ArticleID
			perz := struct {
				Stock     int
				SalePrice float64
			}{}

			config.DB.
				Model(models.Articles{}).
				Select("stock, sale_price", "purchase_price").
				Where("id = ?", articleId).
				First(&perz)
			price, _ := strconv.ParseFloat(anteData.DetailPurchase[f].Price, 32)
			perz.Stock += valueQuantity
			perz.SalePrice = price

			config.DB.
				Model(models.Articles{}).
				Where("id = ?", articleId).
				Select("stock", "sale_price").
				Updates(perz)

		}
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Compra actualizada",
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
