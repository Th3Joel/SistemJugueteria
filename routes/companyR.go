package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"github.com/gofiber/fiber/v2"
)

func CompanyR(f fiber.Router) {
	companyC := controllers.CompanyC{}

	auth := f.Group("/settings/company", mdd.AuthM)

	auth.Get("", companyC.Show)
	auth.Put("", companyC.Update)
}
