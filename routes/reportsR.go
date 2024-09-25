package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func ReportsR(app fiber.Router) {
	reportsC := controllers.ReportsC{}
	r := app.Group("/reports", mdd.AuthM, mdd.RoleM([]string{}))
	r.Get("/inventory", func(c *fiber.Ctx) error { return reportsC.InventoryReport(c, false) })
	r.Get("/inventory/running-out", func(c *fiber.Ctx) error { return reportsC.InventoryReport(c, true) })
	r.Get("/sale/:code", reportsC.SaleReport)
	r.Get("/purchase/:code", reportsC.PurchaseReport)
	r.Get("/suppliers", reportsC.SuppliersReport)
	r.Get("/costumers", reportsC.CostumerReport)
	r.Get("/sales", reportsC.SalesReportPeriodic)
	r.Get("/purchases", reportsC.PurchasesReportPeriodic)
}
