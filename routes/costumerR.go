package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func CostumerR(f fiber.Router) {
	costumerC := controllers.CostumerC{}
	r := f.Group("/clientes", mdd.AuthM)
	r.Get("", costumerC.All)
	r.Get("/select", costumerC.AllSelect)
	r.Get("/:id", costumerC.ShowId)
	r.Post("", mdd.ValM(val.MsjCostumerVal, val.CostumerPost{}, models.Costumers{}), costumerC.Save)
	r.Put("/:id", mdd.ValM(val.MsjCostumerVal, val.CostumerPost{}, models.Costumers{}), costumerC.UpdateId)
	r.Delete("/:id", costumerC.Delete)
}
