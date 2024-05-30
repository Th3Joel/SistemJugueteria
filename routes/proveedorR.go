package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func ProveedorR(f fiber.Router) {
	proveedorC := controllers.ProveedorC{}
	r := f.Group("/proveedores", mdd.AuthM)
	r.Get("", proveedorC.All)
	r.Get("/:id", proveedorC.ShowId)
	r.Post("", mdd.ValM(val.MsjProveedorVal, proveedorC, models.Proveedore{}), proveedorC.Save)
	r.Put("/:id", mdd.ValM(val.MsjProveedorVal, proveedorC, models.Proveedore{}), proveedorC.UpdateId)
	r.Delete("/:id", proveedorC.Delete)
}
