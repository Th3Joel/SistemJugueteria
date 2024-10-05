package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func ExpensesR(f fiber.Router) {
	expenses := controllers.ExpensesC{}
	r := f.Group("/expenses", mdd.AuthM)
	r.Get("", expenses.All)
	r.Post("", mdd.ValM(val.MsjExpensesVal, val.Expenses{}, 0), expenses.Save)
	r.Delete("/:id", expenses.Delete)
}
