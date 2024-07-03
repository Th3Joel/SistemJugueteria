package main

import (
	"Jugueteria/config"
	mdd "Jugueteria/middleware"
	"Jugueteria/routes"
	"Jugueteria/web"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

var port = os.Getenv("PORT")

func main() {
	config.ConnectDB()
	app := fiber.New(fiber.Config{
		Prefork: false,
		AppName: "Jugueteria",
	})

	defer func(app *fiber.App) {
		_ = app.Shutdown()
	}(app)

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173,http://192.168.1.3:5173",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE",
	}))

	//Sistema api
	api := app.Group("/api", mdd.Csrf)
	//AuthR
	routes.AuthR(api)
	//AccountR
	routes.UserR(api)
	//ProveedorR
	routes.SupllierR(api)
	//ClienteR
	routes.CostumerR(api)
	//CompanyR
	routes.CompanyR(api)

	//servir archivos staticos dentro del binario
	app.Get("/*", filesystem.New(filesystem.Config{
		Root:         web.Dist(),
		Index:        "index.html",
		NotFoundFile: "index.html",
	}))

	err := app.Listen(":" + port)
	if err != nil {
		println("Error al iniciar el servidor", err.Error())
	}
}
