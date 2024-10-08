package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func BusinessR(r fiber.Router) {
	bunsiness := controllers.BusinessC{}
	ru := r.Group("/business", mdd.AuthM)

	ru.Get("/", bunsiness.All)
	ru.Post("/", mdd.ValM(val.OtherInventoryOuputsValidation, val.OtherInventoryOuputs{}, 0), bunsiness.Save)
}
