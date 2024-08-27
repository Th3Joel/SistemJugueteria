package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func CompanyR(f fiber.Router) {
	companyC := controllers.CompanyC{}

	auth := f.Group("/settings/company", mdd.AuthM)

	auth.Get("", companyC.Show)
	auth.Get("/logo", companyC.File)
	auth.Put("", mdd.ValM(val.MsjCompanyVal, val.CompanyPost{}, 0), companyC.Update)
}
