package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func AccountR(f fiber.Router) {
	accountC := new(controllers.AccountC)
	r := f.Group("/users", mdd.AuthMiddleware)

	r.Get("/:id", accountC.ShowId)
	r.Get("", accountC.Show)
	r.Post("",
		mdd.ValM(val.AccountV{}, val.MsjAccountVal),
		accountC.Save,
	)
	r.Put("/:id", accountC.Update)
	r.Delete("/:id", accountC.Delete)

}
