package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func HomeR(f fiber.Router) {
	homeC := controllers.HomeC{}
	r := f.Group("/home", mdd.AuthM, mdd.RoleM([]string{}))

	r.Get("/counters", homeC.CountersBox)
	r.Get("/total-sales", homeC.GetTotalSales)
}
