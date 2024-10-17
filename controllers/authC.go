package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/resend/resend-go/v2"
)

type AuthC struct {
	ID       string `json:"-"`
	Email    string `json:"Email" validate:"required,email"`
	Password string `json:"Password" validate:"required"`

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

	// t := jwt.New()
	// _ = t.Set("id", auth.ID)
	// _ = t.Set("exp", time.Now().Add(time.Hour*120).Unix())

	token, _ := tokenH.Gen()
	//Guardar token
	tokenH.Save(token, auth.ID, time.Hour*4, f.IP())

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
	//Verificar si hay caja abierta
	// ca := struct {
	// 	ID string
	// }{}
	// sql := config.DB.Model(models.CashRegister{}).
	// 	Where("user_id = ? AND state = 1", f.Locals("userId").(string)).
	// 	First(&ca)
	// if sql.RowsAffected > 0 {
	// 	return f.JSON(types.Response{
	// 		Status: false,
	// 		Msj:    "Debes de cerrar caja para cerrar sesión",
	// 	})
	// }
	//---------------------------------------------
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

func (a AuthC) ForgotPassword(f *fiber.Ctx) error {
	tokenH := helpers.TokenH{}
	db := config.DB.Model(models.Users{})
	apiKey := "re_45Qkcicn_ET4XG3kFu949N3LstB8bkjbi"
	client := resend.NewClient(apiKey)
	_ = f.BodyParser(&a)

	db.Where("email = ?", a.Email).First(&a)

	genToken, _ := tokenH.Gen()
	tokenH.Save(genToken, a.ID, time.Minute*30, f.IP())

	params := &resend.SendEmailRequest{
		From: "Triceratox <x@support.triceratox.lat>",
		To:   []string{a.Email},
		Html: fmt.Sprintf(`
			<h1 style="text-align: center;">Hola,</h1>

			<h3>has solicitado restablecer tu contraseña para la cuenta de Sistema de
				juguetería "Coleccióname"
			 asociada a esta dirección de correo electrónico ( %s ).</h3>

			<h3>Para obtener el código de restablecimiento de contraseña, haga clic en el siguiente enlace:</h3>
			http://%s/sis/auth/reset-password?code=%s
			<h3>También puede copiar y pegar el enlace anterior en una nueva ventana del 
			navegador o ingresar el código 
			de restablecimiento directamente en la página http://%s/sis/auth/reset-password :</h3>
			 %s
			 <h3>Este código de cambio de contraseña caducará en 30 minutos después 
			 de que se envió este correo electrónico. Para reiniciar el proceso 
			 de cambio de contraseña, haga clic aquí:</h3>
			 http://%s/sis/auth/forgot-password
			 <h3>Si no realizó la solicitud, ignore este correo electrónico.</h3>
			 <h2>Gracias.</h2>
		`, a.Email, f.Hostname(), genToken, f.Hostname(), genToken, f.Hostname()),
		Subject: "Restablecimiento de contraseña",
		//Cc:      []string{"cc@example.com"},
		//Bcc:     []string{"bcc@example.com"},
		//ReplyTo: "replyto@example.com",
	}

	sent, err := client.Emails.Send(params)
	if err != nil {
		fmt.Println(err.Error())
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	fmt.Println(sent.Id)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Hemos enviado un link para restablecer tu contraseña a tu correo",
	})
}

func (AuthC) ResetPassword(f *fiber.Ctx) error {
	passwdH := helpers.PasswdH{}
	tokenH := helpers.TokenH{}
	type PasswordReset struct {
		Code     string
		Password string
		Confirm  string
	}
	var da PasswordReset
	db := config.DB.Model(models.Users{})
	_ = f.BodyParser(&da)

	data := tokenH.Get(da.Code)
	tokenH.Remove(da.Code)
	db.Where("id = ?", data.UserId).
		Update("password", passwdH.Hash(da.Password))

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Contraseña actualizada",
	})
}
