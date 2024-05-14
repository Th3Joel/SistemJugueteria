package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func UserR(f fiber.Router) {
	userC := controllers.UserC{}
	r := f.Group("/users", mdd.AuthMiddleware)

	r.Get("", userC.Show)
	r.Get("/all", userC.All)
	r.Get("/:id", userC.ShowId)
	r.Post("",
		mdd.ValM(userC, val.MsjUserVal),
		userC.Save,
	)
	r.Put("/:id", userC.Update)
	r.Delete("/:id", userC.Delete)

}
