package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func ClienteR(f fiber.Router) {
	costumerC := controllers.ClienteC{}
	r := f.Group("/clientes", mdd.AuthM)
	r.Get("", costumerC.All)
	r.Get("/:id", costumerC.ShowId)
	r.Post("", mdd.ValM(val.MsjCostumerVal, costumerC, models.Cliente{}), costumerC.Save)
	r.Put("/:id", mdd.ValM(val.MsjCostumerVal, costumerC, models.Cliente{}), costumerC.UpdateId)
	r.Delete("/:id", costumerC.Delete)
}
