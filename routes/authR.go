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

	r.Post("/login", mdd.ValM(controllers.AuthC{}, val.MsjAuthVal), authC.Login)
	r.Get("/logout", mdd.AuthM, authC.Logout)
}
