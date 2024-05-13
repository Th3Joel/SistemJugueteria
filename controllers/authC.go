package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type AuthC struct{}

func (AuthC) Login(f *fiber.Ctx) error {
	type Body struct {
		Email    string `form:"email"`
		Password string `form:"password"`
	}
	//Si no se le agrega el & no se puede modificar el original y solo se crea una copia
	tokenH := new(helpers.TokenH)
	passwdH := new(helpers.PasswdH)

	userFind := new(models.User)
	userBody := new(Body)

	f.BodyParser(userBody)
	db := config.DB.Select("id", "email", "password").Find(&userFind, "email = ?", userBody.Email)

	if !passwdH.Verify(userBody.Password, userFind.Password) || db.RowsAffected == 0 {
		return f.JSON(fiber.Map{
			"status": false,
			"msj":    "Credenciales incorrectas",
		})
	}

	t := jwt.New()
	t.Set("id", userFind.ID)
	t.Set("exp", time.Now().Add(time.Hour*120).Unix())

	token := tokenH.Gen(t)
	//Guardar token
	tokenSave := models.Token{
		ID:     uuid.NewString(),
		UserID: userFind.ID,
		Token:  token,
	}

	config.DB.Save(tokenSave)

	return f.JSON(fiber.Map{
		"status": true,
		"token":  token,
	})

}

func (AuthC) Logout(f *fiber.Ctx) error {
	tok := f.Get("key")

	db := config.DB.Delete(&models.Token{}, "token = ?", tok)
	if db.RowsAffected == 0 {
		return f.JSON(fiber.Map{
			"status": false,
			"msj":    "No se pudo cerrar la sesión",
		})
	}
	return f.JSON(fiber.Map{
		"status": true,
		"msj":    "Sesión cerrada",
	})
}
