package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"

	"github.com/gofiber/fiber/v2"
)

func BackupR(f fiber.Router) {
	backupC := controllers.BackupC{}
	app := f.Group("/backup", mdd.AuthM, mdd.RoleM([]string{}))
	app.Get("/gen", backupC.Generate)
	app.Get("/files", backupC.GetFiles)
	app.Get("/restore/:file", func(c *fiber.Ctx) error { return backupC.Restore(c, false) })
	app.Post("/restore", func(c *fiber.Ctx) error { return backupC.Restore(c, true) })
	app.Get("/download/:file", backupC.Download)
}
