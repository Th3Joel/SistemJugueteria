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
	r.Get("/select", costumerC.AllSelect)
	r.Post("", mdd.ValM(val.MsjCostumerVal, val.CostumerPost{}, models.Costumers{}), costumerC.Save)
	admin := r.Group("", mdd.RoleM([]string{}))
	admin.Get("", costumerC.All)
	admin.Get("/:id", costumerC.ShowId)
	admin.Put("/:id", mdd.ValM(val.MsjCostumerVal, val.CostumerPost{}, models.Costumers{}), costumerC.UpdateId)
	admin.Delete("/:id", costumerC.Delete)
}
