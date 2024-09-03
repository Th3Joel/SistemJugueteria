package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func PurchaseR(app fiber.Router) {
	purchase := controllers.PurchaseC{}
	r := app.Group("/purchases", mdd.AuthM)
	r.Get("/", purchase.All)
	r.Get("/:id", purchase.ShowId)
	r.Post("", purchase.Save)
}
