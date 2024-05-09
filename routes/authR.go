package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func AuthR(f fiber.Router) {
	authC := new(controllers.AuthC)
	r := f.Group("/auth")

	r.Post("/login", mdd.ValM(val.AuthV{}, val.MsjAuthVal), authC.Login)
}
