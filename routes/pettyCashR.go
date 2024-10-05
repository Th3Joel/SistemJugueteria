package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func PettyCashR(app fiber.Router) {
	pettyCashC := controllers.PettyCashC{}
	r := app.Group("/pettyCash", mdd.AuthM)
	r.Get("/", pettyCashC.Show)
	r.Put("/", mdd.RoleM([]string{}), pettyCashC.Update)
}
