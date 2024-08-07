package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PriceCategoryC struct {
	ID           string  `json:"id"`
	ArticleBoxID string  `json:"ArticleBoxID"`
	Code         string  `json:"Code"`
	Name         string  `json:"Name"`
	Description  string  `json:"Description"`
	Stock        int     `json:"Stock"`
	SalePrice    float64 `json:"SalePrice"`

	ArticleBox ArticlesBox `json:"ArticlesBox"`

	Model models.PriceCategories `gorm:"-" json:"-"`
	Array []PriceCategoryC       `gorm:"-" json:"-"`
}

type ArticlesBox struct {
	ID   string `json:"-"`
	Code string `json:"code"`
}

func (priceCategory PriceCategoryC) All(c *fiber.Ctx) error {
	db := config.DB.Model(models.PriceCategories{})
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Preload("ArticleBox").
		Offset(skip).
		Limit(take)

	if q.Search == "" {
		db.Find(&priceCategory.Array)
	} else {
		db.Where("code LIKE ?", "%"+q.Search+"%").
			First(&priceCategory.Array)
	}
	db.Count(&count)

	data := make([]interface{}, count)
	for i, v := range priceCategory.Array {
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

func (priceCategory PriceCategoryC) ShowId(f *fiber.Ctx) error {
	db := config.DB.Model(priceCategory.Model)
	id := f.Params("id")
	sql := db.
		Preload("ArticleBox").
		Where("id = ?", id).
		Find(&priceCategory)

	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Precio de articulos no encontrado",
		})
	}

	return f.Status(200).JSON(types.Response{
		Status: true,
		Find:   priceCategory,
	})
}

func (priceCategory PriceCategoryC) Save(f *fiber.Ctx) error {
	db := config.DB
	_ = f.BodyParser(&priceCategory)
	priceCategory.Trim(&priceCategory)
	priceCategory.ID = uuid.NewString()
	sql := db.Create(&models.PriceCategories{
		ID:           priceCategory.ID,
		ArticleBoxID: priceCategory.ArticleBoxID,
		Code:         priceCategory.Code,
		Name:         priceCategory.Name,
		Description:  priceCategory.Description,
		Stock:        priceCategory.Stock,
		SalePrice:    priceCategory.SalePrice,
	})
	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	return f.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Precio de articulo creado",
	})
}

func (priceCategory PriceCategoryC) UpdateId(f *fiber.Ctx) error {
	db := config.DB.Model(priceCategory.Model)
	id := f.Params("id")
	_ = f.BodyParser(&priceCategory)
	priceCategory.Trim(&priceCategory)

	db.
		Where("id = ?", id).
		Select("article_box_id", " code", "name", "description", "stock", "sale_price").
		Updates(priceCategory)

	return f.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Precio de articulo actualizado",
	})
}

func (priceCategory PriceCategoryC) Delete(f *fiber.Ctx) error {
	db := config.DB
	id := f.Params("id")

	sql := db.
		Where("id = ?", id).
		Delete(priceCategory.Model)
	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Precio de articulos no encontrado",
		})
	}

	return f.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Precio de articulo eliminado",
	})
}

func (PriceCategoryC) Trim(u *PriceCategoryC) {
	u.Code = strings.TrimSpace(u.Code)
	u.Name = strings.TrimSpace(u.Name)
	u.Description = strings.TrimSpace(u.Description)
}
