package main

import (
	"Jugueteria/config"
	mdd "Jugueteria/middleware"
	"Jugueteria/routes"
	"Jugueteria/web"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

var port = os.Getenv("PORT")

func main() {
	//config.GetStruct()
	config.ConnectDB()
	app := fiber.New(fiber.Config{
		Prefork: true,
		AppName: "Jugueteria",
	})

	defer app.Shutdown()

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
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
	routes.ProveedorR(api)
	//ClienteR
	routes.ClienteR(api)

	//servir archivos staticos dentro del binario
	app.Get("/*", filesystem.New(filesystem.Config{
		Root:         web.Dist(),
		Index:        "index.html",
		NotFoundFile: "index.html",
	}))

	app.Listen(":" + port)
}
