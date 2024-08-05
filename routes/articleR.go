package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func ArticleR(f fiber.Router) {
	articleC := controllers.ArticleC{}

	r := f.Group("/articles", mdd.AuthM)
	r.Get("/", articleC.All)
	r.Get("/:id", articleC.ShowId)
	r.Post("/", mdd.ValM(val.MsjArticleVal, val.ArticlePost{}, models.Articles{}), articleC.Save)
	r.Put("/:id", mdd.ValM(val.MsjArticleVal, val.ArticlePost{}, models.Articles{}), articleC.UpdateId)
	r.Delete("/:id", articleC.Delete)

}
