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
	r.Get("/:id", sale.ShowId)
	r.Post("", mdd.CashM, sale.Save)
	r.Delete("/:id", mdd.CashM, sale.Cancel)
}
