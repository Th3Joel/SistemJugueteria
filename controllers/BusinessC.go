package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type BusinessC struct {
	ID        string `json:"id"`
	ArticleID string `json:"ArticleID"`
	Quantity  string `json:"Quantity"`
	Reason    string `json:"Reason"`
	CreatedAt string `json:"createdAt"`

	Model models.OtherInventoryOutput `gorm:"-" json:"-"`
	Array []BusinessC                 `gorm:"-" json:"-"`

	Article Article `json:"Article"`
}

type Article struct {
	ID          string   `json:"-"`
	CategoryID  string   `json:"-"`
	Description string   `json:"Description"`
	Category    Category `json:"Category"`
}

func (business BusinessC) All(c *fiber.Ctx) error {
	db := config.DB.Model(business.Model)
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Preload("Article").
		Preload("Article.Category").
		Offset(skip).
		Limit(take).Order("created_at desc")
	if q.Search == "" {
		db.Find(&business.Array)
	} else {
		search := "%" + q.Search + "%"
		db.Where(`
		article_id IN (
			SELECT id 
			FROM articles 
			WHERE  description LIKE ?
		)
		OR
		LOWER(quantity) LIKE LOWER(?)
		 OR
		LOWER(reason) LIKE LOWER(?)
		`, search, search, search).
			Find(&business.Array)
	}
	config.DB.Model(business.Model).Select("COUNT(id) AS count").Count(&count)

	data := make([]interface{}, len(business.Array))
	for i, v := range business.Array {
		data[i] = v
	}

	return c.Status(200).JSON(types.Response{
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

func (bu BusinessC) Save(c *fiber.Ctx) error {
	db := config.DB.Model(bu.Model)

	_ = c.BodyParser(&bu)

	quantity, _ := strconv.Atoi(bu.Quantity)
	sql := db.Create(&models.OtherInventoryOutput{
		ID:        uuid.NewString(),
		ArticleID: bu.ArticleID,
		Quantity:  quantity,
		Reason:    bu.Reason,
	})

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un al guardar",
		})
	}

	articleModel := models.Articles{}
	sql2 := config.DB.Select("id, stock").Where("id = ?", bu.ArticleID).First(&articleModel)
	articleModel.Stock -= quantity
	config.DB.Model(models.Articles{}).Where("id = ?", bu.ArticleID).Update("stock", articleModel.Stock)
	if sql2.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un alr esta de inventario",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Salida de inventario creada",
	})

}
