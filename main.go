package main

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	mdd "Jugueteria/middleware"
	"Jugueteria/routes"
	"Jugueteria/web"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

const defaultPort = ":5000"

func registerRoutes(api fiber.Router) {
	routes.ArticleBoxR(api)
	routes.ArticleR(api)
	routes.AuthR(api)
	routes.BackupR(api)
	routes.BusinessR(api)
	routes.CashRegisterR(api)
	routes.CategoryR(api)
	routes.CompanyR(api)
	routes.CostumerR(api)
	routes.ExpensesR(api)
	routes.HomeR(api)
	routes.PettyCashR(api)
	routes.PurchaseR(api)
	routes.RefundR(api)
	routes.ReportsR(api)
	routes.SaleR(api)
	routes.SupllierR(api)
	routes.UserR(api)
}

func main() {
	if !fiber.IsChild() {
		filesH := helpers.FilesH{}
		if !filesH.CreateFolder("backups") {
			fmt.Println("Error al crear la carpeta backups")
		}
		if !filesH.CreateFolder("uploads") {
			fmt.Println("Error al crear la carpeta backups")
		}
		go config.CleanSqliteToken()
	}

	app := fiber.New(fiber.Config{
		Prefork:                   false,
		AppName:                   "Jugueteria",
		DisableDefaultContentType: true,
		//DisableStartupMessage:     true,
		BodyLimit: 1024 * 1024 * 1024 * 10,
	})

	defer func(app *fiber.App) {
		_ = app.Shutdown()
	}(app)
	config.ConnectDB()
	app.Use(func(f *fiber.Ctx) error {
		//Secure options to headers
		f.Set("X-Powered-By", "Triceratox software")
		f.Set("X-Frame-Options", "DENY")
		f.Set("Content-Security-Policy", "default-src 'self'; connect-src *; font-src *; script-src-elem * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline';")
		f.Set("X-XSS-Protection", "1; mode=block")
		f.Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
		f.Set("Referrer-Policy", "strict-origin")
		f.Set("X-Content-Type-Options", "nosniff")
		f.Set("Permissions-Policy", "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()")

		return f.Next()
	})
	app.Use(logger.New(logger.Config{
		Format:     "[${time}] ${ip}  ${status} - ${latency} ${method} ${path}\n",
		TimeFormat: "02-Jan-2006 03:04:05 PM",
		TimeZone:   "America/Managua",
	}))

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PUT,DELETE",
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "text/html")
		return c.Send([]byte("<h1><a href='/sis'>Ir al sistema</a></h1>"))

	})

	//Frontend
	//servir archivos staticos dentro del binario
	app.Get("/sis/*", filesystem.New(filesystem.Config{
		Root:         web.Dist(),
		Index:        "index.html",
		NotFoundFile: "sis/index.html",
	}))

	//Sistema api
	api := app.Group("/api", mdd.Csrf)
	registerRoutes(api)

	port := ""
	if os.Getenv("PORT") == "" {
		port = defaultPort
	} else {
		port = ":" + os.Getenv("PORT")
	}
	if err := app.Listen(port); err != nil {
		log.Fatal("Error al iniciar el servidor: ", err)
	}
}
