package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func CashRegisterR(f fiber.Router) {
	cashRegister := controllers.CashRegisterC{}
	r := f.Group("/cash-register", mdd.AuthM)
	r.Get("", cashRegister.Show)
	r.Get("/verify", mdd.CashM, cashRegister.Verify)
	r.Post("/open", cashRegister.Save)
}
