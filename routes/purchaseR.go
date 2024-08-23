package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func PurchaseR(app fiber.Router) {
	purchase := controllers.PurchaseC{}
	r := app.Group("/purchase", mdd.AuthM)
	r.Post("", purchase.Save)
}
