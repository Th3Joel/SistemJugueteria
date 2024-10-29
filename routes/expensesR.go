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
	//r.Get("/all", mdd.CashM, expenses.AllCashRegister)
	r.Get("", expenses.All)
	r.Post("", mdd.ValM(val.MsjExpensesVal, val.Expenses{}, 0), func(c *fiber.Ctx) error { return expenses.Save(c, false) })
	r.Post("/cash", mdd.CashM, mdd.ValM(val.MsjExpensesVal, val.Expenses{}, 0), func(c *fiber.Ctx) error { return expenses.Save(c, true) })
	r.Delete("/:id", expenses.Delete)
	r.Delete("/petty/:id", expenses.DeletePetty)

}
