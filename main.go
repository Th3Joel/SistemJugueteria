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
)

// func preventItFromRunningManyTimes() {

// 	// Nombre del archivo de bloqueo
// 	lockFile := "./p.lock"

// 	// Intenta crear el archivo de bloqueo
// 	file, err := os.OpenFile(lockFile, os.O_CREATE|os.O_EXCL|os.O_RDWR, 0666)
// 	if err != nil {
// 		if os.IsExist(err) {
// 			//log.Println("El proceso ya está en ejecución.")
// 			return
// 		}
// 		log.Fatalf("Error al crear el archivo de bloqueo: %v", err)
// 	}
// 	defer file.Close()

// 	go config.CleanSqliteToken()

// 	// Crear un canal para recibir señales
// 	sigs := make(chan os.Signal, 1)
// 	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGHUP, syscall.SIGQUIT, syscall.SIGSTOP)

// 	// Goroutine para manejar señales
// 	go func() {
// 		sig := <-sigs
// 		fmt.Println("Señal recibida:", sig)
// 		os.Remove(lockFile)
// 		os.Exit(0)
// 	}()

// }

func main() {
	go config.CleanSqliteToken()

	config.ConnectDB()

	app := fiber.New(fiber.Config{
		AppName: "Jugueteria",
	})

	// defer func(app *fiber.App) {
	// 	_ = app.Shutdown()
	// }(app)

	//app.Use(logger.New())

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
	//ArticleBoxR
	routes.ArticleBoxR(api)
	//CategoryR
	routes.CategoryR(api)
	//HomeR
	routes.HomeR(api)
	//ArticleR
	routes.ArticleR(api)

	//servir archivos staticos dentro del binario
	app.Get("/*", filesystem.New(filesystem.Config{
		Root:         web.Dist(),
		Index:        "index.html",
		NotFoundFile: "index.html",
	}))

	err := app.Listen(":" + os.Getenv("PORT"))
	if err != nil {
		println("Error al iniciar el servidor", err.Error())
	}
}
