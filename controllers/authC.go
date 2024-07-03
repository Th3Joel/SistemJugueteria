package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"Jugueteria/types"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type AuthC struct {
	ID       string `json:"-"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`

	Model models.Users `gorm:"-" json:"-"`
}

func (auth AuthC) Login(f *fiber.Ctx) error {
	db := config.DB.Model(auth.Model)
	//Si no se le agrega el & no se puede modificar el original y solo se crea una copia
	tokenH := helpers.TokenH{}
	passwdH := helpers.PasswdH{}

	_ = f.BodyParser(&auth)

	passwdText := auth.Password
	db.
		Select("id", "email", "password").
		Where("email = ?", auth.Email).
		First(&auth)

	if !passwdH.Verify(passwdText, auth.Password) || db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Credenciales incorrectas",
		})
	}

	t := jwt.New()
	_ = t.Set("id", auth.ID)
	_ = t.Set("exp", time.Now().Add(time.Hour*120).Unix())

	token := tokenH.Gen(t)
	//Guardar token
	tokenH.Save(token, auth.ID)

	// tokenSave := models.Token{
	// 	ID:     uuid.NewString(),
	// 	UserID: userFind.ID,
	// 	Token:  token,
	// }
	//config.DB.Save(&tokenSave)

	cookie := new(fiber.Cookie)
	cookie.Name = "_key"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 24)
	cookie.HTTPOnly = true
	//cookie.Secure = true
	cookie.SameSite = "Lax"
	f.Cookie(cookie)

	return f.JSON(types.Response{
		Status: true,
		//"token":  token,
	})

}

func (AuthC) Logout(f *fiber.Ctx) error {
	//tok := f.Get("key")
	tokenH := helpers.TokenH{}
	tok := f.Cookies("_key")

	//db := config.DB.Delete(models.Token{}, "token = ?", tok)
	if tokenH.Remove(tok) {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se pudo cerrar la sesión",
		})
	}
	f.Cookie(&fiber.Cookie{
		Name:    "_key",
		Value:   "",
		Expires: time.Now().Add(time.Hour * -23),
	})
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Sesión cerrada",
	})
}
