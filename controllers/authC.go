package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type AuthC struct{}

func (ac AuthC) Login(f *fiber.Ctx) error {
	//Si no se le agrega el & no se puede modificar el original y solo se crea una copia
	tokenH := new(helpers.TokenH)
	passwdH := new(helpers.PasswdH)

	userFind := new(models.Prueba)
	userBody := new(models.Prueba)

	f.BodyParser(&userBody)

	err := config.DB.Select("id", "email", "password").Find(&userFind, "email = ?", userBody.Email)

	if !passwdH.Verify(userBody.Password, userFind.Password) || err.RowsAffected == 0 {
		return f.JSON(fiber.Map{
			"status": false,
			"msj":    "Credenciales incorrectas",
		})
	}

	t := jwt.New()
	t.Set("id", userFind.ID)
	t.Set("exp", time.Now().Add(time.Hour*120).Unix())

	return f.JSON(fiber.Map{
		"status": true,
		"token":  tokenH.Gen(t),
	})

}
