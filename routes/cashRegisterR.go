package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func CashRegisterR(f fiber.Router) {
	cashRegister := controllers.CashRegisterC{}
	r := f.Group("/cash-register", mdd.AuthM)
	r.Get("", mdd.RoleM([]string{}), func(c *fiber.Ctx) error { return cashRegister.All(c, false) })
	r.Get("/my", func(c *fiber.Ctx) error { return cashRegister.All(c, true) })
	r.Get("/show", mdd.CashM, cashRegister.Show)
	r.Get("/show/:id", mdd.RoleM([]string{}), func(c *fiber.Ctx) error { return cashRegister.ShowId(c, false) })
	r.Get("/show/my/:id", func(c *fiber.Ctx) error { return cashRegister.ShowId(c, true) })
	r.Get("/verify", mdd.CashM, cashRegister.Verify)
	r.Post("/open", mdd.ValM(val.MsjReqOpenCashVal, val.ReqOpenCash{}, 0), cashRegister.Save)
	//r.Post("/close", mdd.ValM(val.MsjDenominationVal, val.Denomination{}, 0), mdd.CashM, cashRegister.Close)
	r.Delete("/close", mdd.CashM, cashRegister.Close)
}
