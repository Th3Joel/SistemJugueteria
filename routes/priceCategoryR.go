package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"
	"github.com/gofiber/fiber/v2"
)

func PriceCategoryR(f fiber.Router) {
	priceCategoryR := controllers.PriceCategoryC{}
	r := f.Group("/price-categories", mdd.AuthM)

	r.Get("", priceCategoryR.All)
	r.Get("/:id", priceCategoryR.ShowId)
	r.Post("", mdd.ValM(val.MsjPriceCategoryVal, val.PriceCategoryPost{}, models.PriceCategories{}), priceCategoryR.Save)
	r.Put("/:id", mdd.ValM(val.MsjPriceCategoryVal, val.PriceCategoryPost{}, models.PriceCategories{}), priceCategoryR.UpdateId)
	r.Delete("/:id", priceCategoryR.Delete)
}
