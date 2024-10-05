package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func RefundR(app fiber.Router) {
	refundC := controllers.RefundC{}
	r := app.Group("/refunds", mdd.AuthM, mdd.RoleM([]string{}))
	r.Get("/", refundC.All)
	r.Post("/", mdd.ValM(val.RefundsValidation, val.Refund{}, 0), refundC.Create)
}
