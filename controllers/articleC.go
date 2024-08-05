package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"math"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ArticleC struct {
	ID            string  `json:"id"`
	ArticleBoxID  string  `json:"ArticleBoxID"`
	CategoryID    string  `json:"CategoryID"`
	Code          string  `json:"Code"`
	Description   string  `json:"Description"`
	State         int     `json:"State"`
	Stock         int     `json:"Stock"`
	SalePrice     float64 `json:"SalePrice"`
	PurchasePrice float64 `json:"PurchasePrice"`
	Profit        float64 `json:"Profit"`

	Model models.Articles `json:"-" gorm:"-"`
	Array []ArticleC      `json:"-" gorm:"-"`
}

func (article ArticleC) All(c *fiber.Ctx) error {
	db := config.DB.Model(article.Model)
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&article.Array)
	} else {
		db.Where("code LIKE ?", "%"+q.Search+"%").
			Find(&article.Array)
	}
	db.Count(&count)

	data := make([]interface{}, count)
	for i, v := range article.Array {
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

func (article ArticleC) ShowId(c *fiber.Ctx) error {
	db := config.DB.Model(article.Model)
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		First(&article)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Articulo no encontrado",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Find:   article,
	})
}

func (article ArticleC) Save(c *fiber.Ctx) error {
	db := config.DB

	//Pasar el body a la estructura
	_ = c.BodyParser(&article)
	article.trim(&article)
	fmt.Println(article)

	sql := db.Create(&models.Articles{
		ID:           uuid.NewString(),
		ArticleBoxID: article.ArticleBoxID,
		CategoryID:   article.CategoryID,
		Code:         article.Code,
		Description:  article.Description,
		Stock:        article.Stock,
		SalePrice:    article.SalePrice,
	})
	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	return c.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Articulo creado",
	})
}

func (article ArticleC) UpdateId(c *fiber.Ctx) error {
	db := config.DB.Model(article.Model)
	id := c.Params("id")

	_ = c.BodyParser(&article)
	article.trim(&article) //Eliminar los espacios en blanco

	db.
		Where("id = ?", id).
		Select("code", "description", "stock", "sale_price").
		Updates(article)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Articulo actualizado correctamente",
	})
}

func (article ArticleC) Delete(c *fiber.Ctx) error {
	db := config.DB
	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		Delete(article.Model)
	if sql.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Articulo no encontrado",
		})
	}

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Articulo eliminado",
	})
}

func (ArticleC) trim(u *ArticleC) {
	u.Code = strings.TrimSpace(u.Code)
	u.Description = strings.TrimSpace(u.Description)
}
