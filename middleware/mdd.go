package mdd

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	val "Jugueteria/validation"
	"fmt"
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
	queryToken, queryUserID := tokenH.Get(token)
	fmt.Println("Consulta: ", queryToken, "Consulta 2", queryUserID)
	// Verificacion
	if token == "" || !tokenH.Verify(queryToken) || queryToken == "" {
		// Si el token no es válido, responde con un error de autorización
		return c.JSON(fiber.Map{
			"status": false,
			"error":  "No autorizado",
		})
	}
	modelUser := models.Users{}
	config.DB.Select("id", "Role").First(&modelUser, "id = ?", queryUserID)
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
		v := &data

		// Parsea el body
		_ = c.BodyParser(v)
		//Borra los espacios en blanco
		TrimSpaces(v)
		validate := validator.New()
		// Registra la validaciones perzonalizadas
		_ = validate.RegisterValidation("isRepeat", val.IsRepeat(model, c))

		_ = validate.RegisterValidation("confirmPasswd", val.ConfirmPassword(v))

		is, errorMsj := helpers.ParseMsj(v, validate, valMsj)
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
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "No tiene permisos",
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
	coo := f.Cookies("_cf")
	exp, t := helpers.Csrf.Get(coo)
	helpers.Csrf.Delete(coo)

	tok := helpers.Csrf.Gen()
	tiempo := time.Now().Add(time.Hour * 24)
	helpers.Csrf.Set(tok, tiempo.Unix())
	f.Cookie(&fiber.Cookie{
		Name:     "_cf",
		Value:    tok,
		Expires:  tiempo,
		HTTPOnly: true,
		Secure:   false,
	})
	//Valida en token csrf
	if !helpers.Csrf.Verify([]byte(coo), []byte(t)) || exp < time.Now().Unix() {
		return f.JSON(fiber.Map{
			"status": false,
			"msj":    "Solicitud expirada",
		})
	}

	return f.Next()
}
