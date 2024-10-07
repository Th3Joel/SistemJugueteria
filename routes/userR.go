package routes

import (
	"Jugueteria/controllers"
	mdd "Jugueteria/middleware"
	"Jugueteria/models"
	val "Jugueteria/validation"

	"github.com/gofiber/fiber/v2"
)

func UserR(f fiber.Router) {
	userC := controllers.UserC{}
	r := f.Group("settings/users", mdd.AuthM)

	//Mostrar usuario logeado
	r.Get("/user", userC.Show)
	r.Get("/picture/:email", userC.GetPicture)

	//Ruta protegidas solo el administrador
	admin := r.Group("", mdd.RoleM([]string{}))
	//Lista todos los usuarios
	admin.Get("", userC.All)
	//Mostrar usuario por id
	admin.Get("/user/:id", userC.ShowId)
	//Crear usuario
	admin.Post("",
		mdd.ValM(val.MsjUserVal, val.UserPost{}, models.Users{}),
		userC.Save,
	)
	//Actualizar usuario registrado
	admin.Put("/",
		mdd.ValM(val.MsjUserVal, val.UserPut{}, models.Users{}),
		userC.Update)
	//Actualizar usuario por id
	admin.Put("/:id",
		mdd.ValM(val.MsjUserVal, val.UserPut{}, models.Users{}),
		userC.UpdateId)
	//Eliminar usuario
	admin.Delete("/:id", userC.Delete)
}
