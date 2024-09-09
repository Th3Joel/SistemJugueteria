package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func ExpensesR(f fiber.Router) {
	expenses := controllers.ExpensesC{}
	r := f.Group("/expenses", mdd.AuthM, mdd.CashM)
	r.Get("", expenses.All)
	r.Post("", expenses.Save)
	r.Delete("/:id", expenses.Delete)
}
