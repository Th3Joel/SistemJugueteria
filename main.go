package main

import (
	"Jugueteria/config"
	"Jugueteria/routes"
	"Jugueteria/web"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/csrf"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/utils"
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
	app.Use(csrf.New(csrf.Config{
		KeyLookup:      "header:X-Csrf-Token",
		CookieName:     "_csrf",
		CookieSameSite: "Lax",
		Expiration:     1 * time.Hour,
		CookieHTTPOnly: true,
		CookieSecure:   true,
		KeyGenerator:   utils.UUIDv4,
		SingleUseToken: true,
		Extractor: func(c *fiber.Ctx) (string, error) {
			return c.Cookies("_csrf"), nil
		},
		SessionKey:        "fiber.csrf.token",
		HandlerContextKey: "fiber.csrf.handler",
	}))
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE",
	}))

	//Sistema api
	api := app.Group("/api")
	//AuthR
	routes.AuthR(api)
	//AccountR
	routes.UserR(api)

	//servir archivos staticos dentro del binario
	app.Get("/*", filesystem.New(filesystem.Config{
		Root:         web.Dist(),
		Index:        "index.html",
		NotFoundFile: "index.html",
	}))

	app.Listen(":" + port)
}
