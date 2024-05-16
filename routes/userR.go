package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func UserR(f fiber.Router) {
	userC := controllers.UserC{}
	r := f.Group("/users", mdd.AuthM)

	//Mostrar usuario logeado
	r.Get("/user", userC.Show)

	//Ruta protegidas solo el administrador
	admin := r.Group("", mdd.RoleM([]string{}))
	//Lista todos los usuarios
	admin.Get("", userC.All)
	//Mostrar usuario por id
	admin.Get("/user/:id", userC.ShowId)
	//Crear usuario
	admin.Post("",
		mdd.ValM(val.UserPost{}, val.MsjUserVal),
		userC.Save,
	)
	//Actualizar usuario por id
	admin.Put("/",
		mdd.ValM(val.UserPut{}, val.MsjUserVal),
		userC.Update)
	//Actualizar usuario logeado
	admin.Put("/:id",
		mdd.ValM(val.UserPut{}, val.MsjUserVal),
		userC.UpdateId)
	//Eliminar usuario
	admin.Delete("/:id", userC.Delete)
}
