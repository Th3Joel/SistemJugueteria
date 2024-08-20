package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func ArticleBoxR(f fiber.Router) {
	articleBoxC := controllers.ArticleBoxC{}
	r := f.Group("/articles-box", mdd.AuthM)
	r.Get("", articleBoxC.All)
	r.Get("/select", articleBoxC.AllSelect)
	r.Get("/cost/:id", articleBoxC.GetCost)
	r.Get("/:id", articleBoxC.ShowId)
	r.Post("", mdd.ValM(val.MsjArticleBoxVal, val.ArticleBoxPost{}, models.ArticlesBox{}), articleBoxC.Save)
	r.Put("/:id", mdd.ValM(val.MsjArticleBoxVal, val.ArticleBoxPost{}, models.ArticlesBox{}), articleBoxC.UpdateId)
	r.Delete("/:id", articleBoxC.Delete)
}
