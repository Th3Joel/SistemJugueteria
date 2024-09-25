package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func SupllierR(f fiber.Router) {
	supplierC := controllers.SupplierC{}
	r := f.Group("/suppliers", mdd.AuthM, mdd.RoleM([]string{}))
	r.Get("", supplierC.All)
	r.Get("/select", supplierC.AllSelect)
	r.Get("/:id", supplierC.ShowId)
	r.Post("", mdd.ValM(val.MsjProveedorVal, val.SupplierPost{}, models.Suppliers{}), supplierC.Save)
	r.Put("/:id", mdd.ValM(val.MsjProveedorVal, val.SupplierPost{}, models.Suppliers{}), supplierC.UpdateId)
	r.Delete("/:id", supplierC.Delete)
}
