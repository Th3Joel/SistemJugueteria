package main

import (
	"Jugueteria/config"
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

	config.ConnectDB()
	app := fiber.New(fiber.Config{
		Prefork: true,
		AppName: "Jugueteria",
	})
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
	}))

	//servir archivos staticos dentro del binario
	app.Use("/", filesystem.New(filesystem.Config{
		Root: web.Dist(),
	}))

	//Sistema api
	api := app.Group("/api")
	//AuthR
	routes.AuthR(api)
	//AccountR
	routes.AccountR(api)

	app.Listen(":8040")
}
