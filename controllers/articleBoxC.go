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

type ArticleBoxC struct {
	ID            string             `json:"id"`
	Code          string             `json:"Code"`
	Description   string             `json:"Description"`
	ToysQuantity  int64              `json:"ToysQuantity"`
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
		db.Where("LOWER(code) LIKE LOWER(?)", "%"+q.Search+"%").
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

func (article ArticleBoxC) GetCost(f *fiber.Ctx) error {
	db := config.DB.Model(article.Model)
	id := f.Params("id")
	type Perz struct {
		ToysQuantity  int64   `json:"toys_quantity"`
		PurchasePrice float64 `json:"purchase_price"`
		Cost          float64 `json:"cost"`
	}
	var art Perz
	sql := db.
		Select("toys_quantity, purchase_price").
		Where("id = ?", id).
		First(&article)
	art.Cost = article.PurchasePrice / float64(article.ToysQuantity)
	art.ToysQuantity = article.ToysQuantity
	art.PurchasePrice = article.PurchasePrice

	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Articulo no encontrado",
		})
	}

	return f.Status(200).JSON(types.Response{
		Status: true,
		Find:   art,
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
		ToysQuantity:  article.ToysQuantity,
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
		Select("code", "description", "purchase_price", "ToysQuantity").
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

func (article ArticleBoxC) GetProfit(f *fiber.Ctx) error {
	id := f.Params("id")
	//Calcula el precio de compra general de la caja
	purchasePriceArticle := 0.0
	config.DB.Model(article.Model).Select(`
		(purchase_price / toys_quantity) AS purchase_price_article
	`).
		Where("id = ?", id).
		First(&purchasePriceArticle)

		//Trae todos los articulos de la caja
	idArticlesFromArticleBox := []string{}
	config.DB.Model(models.Articles{}).
		Select("articles.id").
		Joins("inner join detail_purchases on detail_purchases.article_id = articles.id").
		Joins("inner join purchases on purchases.id = detail_purchases.purchase_id").
		Joins("inner join articles_boxes on articles_boxes.id = purchases.article_box_id").
		Where("articles_boxes.id = ?", "c3cedc6a-a36f-47a3-9b6b-e1223d4b5f1a").
		Group("articles.id, articles.description").
		Find(&idArticlesFromArticleBox)

	//Formatea el array de ids para usarlo en la consulta
	idsFormated := ""
	for i := 0; i < len(idArticlesFromArticleBox); i++ {
		idsFormated += fmt.Sprintf("'%s'", idArticlesFromArticleBox[i])
		if i < len(idArticlesFromArticleBox)-1 {
			idsFormated += ","
		}
	}
	//Calcula la ganancia de cada articulo
	//fmt.Println(idsFormated)
	profitArticles := []struct {
		Description   string  `json:"description"`
		Ganancia      float64 `json:"ganancia"`
		TotalQuantity float64 `json:"total_quantity"`
	}{}
	config.DB.Model(models.Articles{}).
		Select("articles.description, "+
			"SUM((articles.sale_price - ?) * detail_sales.quantity) AS Ganancia, "+
			"SUM(detail_sales.quantity) AS total_quantity",
			purchasePriceArticle).
		Joins("INNER JOIN detail_sales ON detail_sales.article_id = articles.id").
		Where("articles.id IN (" + idsFormated + ")").
		Group("articles.description").
		Find(&profitArticles)

	return f.JSON(types.Response{
		Status: true,
		Find:   profitArticles,
	})
}
