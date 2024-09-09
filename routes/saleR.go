package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func SaleR(app fiber.Router) {
	sale := controllers.SaleC{}
	r := app.Group("/sales", mdd.AuthM)
	r.Get("/", sale.All)
	r.Get("/newCode", sale.GetNewCode)
	r.Post("", mdd.CashM, sale.Save)
}
