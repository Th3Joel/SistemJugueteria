package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func CategoryR(f fiber.Router) {
	categoryR := controllers.CategoryC{}
	r := f.Group("/categories", mdd.AuthM)

	r.Get("", categoryR.All)
	r.Get("/select", categoryR.AllSelect)
	r.Get("/:id", categoryR.ShowId)
	r.Post("", mdd.ValM(val.MsjCategoryVal, val.CategoryPost{}, models.Category{}), categoryR.Save)
	r.Put("/:id", mdd.ValM(val.MsjCategoryVal, val.CategoryPost{}, models.Category{}), categoryR.UpdateId)
	r.Delete("/:id", categoryR.Delete)
}
