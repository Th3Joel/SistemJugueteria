package mdd

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"Jugueteria/types"
	val "Jugueteria/validation"
	"reflect"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func AuthM(c *fiber.Ctx) error {
	tokenH := helpers.TokenH{}
	// Obtiene el token de la cabecera de autorización
	//token := c.Get("key")
	token := c.Cookies("_key")

	//Verificar si el token esta almacenado
	//modelToken := models.Token{}
	//db := config.DB.Select("UserID").First(&modelToken, "token = ?", token)
	data := tokenH.Get(token)
	var modelUser models.Users
	config.DB.Select("id", "Role").First(&modelUser, "id = ?", data.UserId)
	// Verificacion
	if token == "" ||
		!tokenH.Compare(token, data.Key) ||
		data.Key == "" ||
		data.Exp < time.Now().Unix() ||
		modelUser.ID == "" {
		// Si el token no es válido, responde con un error de autorización
		return c.JSON(types.Response{
			Status: false,
			Msj:    "No autorizado",
		})
	}

	//Almacenar lso datos en la req
	//tokeData := t.PrivateClaims()
	c.Locals("userId", modelUser.ID)
	c.Locals("role", modelUser.Role)
	// Si el token es válido, permite continuar con la solicitud
	return c.Next()
}

func ValM[T any, R any](valMsj map[string]string, data T, model R) func(*fiber.Ctx) error {

	return func(c *fiber.Ctx) error {
		//Crea un puntero a la estructura pasada como argumento

		// Parsea el body
		_ = c.BodyParser(&data)
		//Borra los espacios en blanco
		TrimSpaces(&data)
		validate := validator.New()
		// Registra la validaciones perzonalizadas
		_ = validate.RegisterValidation("isRepeat", val.IsRepeat(model, c))

		_ = validate.RegisterValidation("confirmPasswd", val.ConfirmPassword(&data))
		_ = validate.RegisterValidation("omitCustom", val.OmitCustom(&data))
		_ = validate.RegisterValidation("gtC", val.Gt())
		_ = validate.RegisterValidation("integer", val.Integer())

		is, errorMsj := helpers.ParseMsj(data, validate, valMsj)
		if is {
			return c.JSON(fiber.Map{
				"status": false,
				"errors": errorMsj,
			})
		}

		return c.Next()
	}
}

func RoleM(roles []string) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		role := c.Locals("role").(string)
		for _, r := range roles {
			if r == role {
				return c.Next()
			}
		}
		if role == "admin" {
			return c.Next()
		}
		return c.JSON(types.Response{
			Status: false,
			Msj:    "No tiene permisos",
		})
	}
}

// TrimSpaces recorre los campos de la estructura y elimina los espacios en blanco.
func TrimSpaces(s interface{}) {
	v := reflect.ValueOf(s).Elem()
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		if field.Kind() == reflect.String {
			field.SetString(strings.TrimSpace(field.String()))
		}
	}
}

func Csrf(f *fiber.Ctx) error {
	tokenH := helpers.TokenH{}
	coo := f.Cookies("_cf")
	t := tokenH.Get(coo)
	//fmt.Println("Datos de exoaria: "+coo, t.Exp, t)
	if t.Key == "" {
		genCookieCSRF(f, &tokenH)
	}

	if t.Key != "" && t.Exp < time.Now().Unix() {
		tokenH.Remove(t.Key)
		genCookieCSRF(f, &tokenH)
	}

	// Valida en token csrf
	if !tokenH.Compare(coo, t.Key) {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Solicitud expirada, intente nuevamente",
		})
	}
	return f.Next()
}

func genCookieCSRF(f *fiber.Ctx, h *helpers.TokenH) {
	tok, _ := h.Gen()
	h.Save(tok, "Token csrf", time.Second*10, f.IP())

	f.Cookie(&fiber.Cookie{
		Name:     "_cf",
		Value:    tok,
		Expires:  time.Now().Add(time.Minute * 1),
		HTTPOnly: true,
		Secure:   false,
	})
}
