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
	admin := r.Group("", mdd.RoleM([]string{}))
	admin.Get("/:id", articleC.ShowId)
	admin.Post("/", mdd.ValM(val.MsjArticleVal, val.ArticlePost{}, models.Articles{}), articleC.Save)
	admin.Put("/:id", mdd.ValM(val.MsjArticleVal, val.ArticlePost{}, models.Articles{}), articleC.UpdateId)
	admin.Delete("/:id", articleC.Delete)

}
