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

type ArticleBoxC struct {
	ID            string             `json:"id"`
	Code          string             `json:"Code"`
	Description   string             `json:"Description"`
	ToysQuantity  int                `json:"ToysQuantity"`
	PurchasePrice float64            `json:"PurchasePrice"`
	Model         models.ArticlesBox `gorm:"-" json:"-"`
	Array         []ArticleBoxC      `gorm:"-" json:"-"`
}

func (article ArticleBoxC) All(c *fiber.Ctx) error {
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

func (article ArticleBoxC) AllSelect(f *fiber.Ctx) error {
	db := config.DB.Model(article.Model)

	db.Find(&article.Array)

	type Perz struct {
		ID          string `json:"id"`
		Code        string `json:"code"`
		Description string `json:"description"`
	}

	var custom []Perz
	for _, v := range article.Array {
		custom = append(custom, Perz{
			ID:          v.ID,
			Code:        v.Code,
			Description: v.Description,
		})
	}

	return f.JSON(custom)

}

func (article ArticleBoxC) ShowId(c *fiber.Ctx) error {
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

func (article ArticleBoxC) Save(c *fiber.Ctx) error {
	db := config.DB

	//Pasar el body a la estructura
	_ = c.BodyParser(&article)
	article.trim(&article)
	article.ID = uuid.NewString()

	sql := db.Create(&models.ArticlesBox{
		ID:            article.ID,
		Code:          article.Code,
		Description:   article.Description,
		PurchasePrice: article.PurchasePrice,
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

func (article ArticleBoxC) UpdateId(c *fiber.Ctx) error {
	db := config.DB.Model(article.Model)
	id := c.Params("id")

	_ = c.BodyParser(&article)
	article.trim(&article) //Eliminar los espacios en blanco

	db.
		Where("id = ?", id).
		Select("code", "description", "purchase_price").
		Updates(article)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Articulo actualizado correctamente",
	})
}

func (article ArticleBoxC) Delete(c *fiber.Ctx) error {
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

func (ArticleBoxC) trim(u *ArticleBoxC) {
	u.Code = strings.TrimSpace(u.Code)
	u.Description = strings.TrimSpace(u.Description)
}
