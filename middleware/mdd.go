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
	modelToken := models.Token{}
	db := config.DB.Select("UserID").First(&modelToken, "token = ?", token)

	// Verificacion
	if token == "" || !tokenH.Verify(token) || db.RowsAffected == 0 {
		// Si el token no es válido, responde con un error de autorización
		return c.JSON(fiber.Map{
			"status": false,
			"error":  "No autorizado",
		})
	}

	modelUser := models.Users{}
	config.DB.First(&modelUser, "id = ?", modelToken.UserID)
	fmt.Println("Usuario enconrado: ", modelUser)
	//Almacenar lso datos en la req
	//tokeData := t.PrivateClaims()
	c.Locals("userId", modelUser.ID)
	c.Locals("role", modelUser.Role)
	// Si el token es válido, permite continuar con la solicitud
	return c.Next()
}

func ValM[T any, R any](valMsj map[string]string, data T, model R) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {

		validate := validator.New()
		v := &data
		validate.RegisterValidation("isRepeat", func(fl validator.FieldLevel) bool {
			var id string
			if c.Params("id") != "" {
				id = c.Params("id")
			} else {
				id = c.Locals("userId").(string)
			}
			return val.Repeat(fl, id, model)
		})

		/*La variable v se inicializa utilizando reflexión.
		Crea una nueva instancia del tipo del parámetro data
		utilizando reflect.New(reflect.TypeOf(data)).Interface().
		 Esto permite que el middleware funcione con cualquier
		 estructura de datos pasada.*/

		TrimSpaces(v)
		c.BodyParser(v)
		//return c.JSON(v)
		if err := validate.Struct(v); err != nil {
			// Crea un mapa para almacenar los mensajes de error de validación
			errorMsj := make(map[string]string)
			for _, errVal := range err.(validator.ValidationErrors) {
				// Crea la clave en el formato "campo.regla"
				key := fmt.Sprintf("%s.%s", errVal.StructField(), errVal.Tag())

				// Verifica si hay un mensaje personalizado para esa clave
				if message, ok := valMsj[key]; ok {
					// Añade el mensaje de error personalizado al mapa de mensajes de error
					errorMsj[strings.ToLower(errVal.Field())] = message
				} else {
					// Si no hay un mensaje personalizado, añade un mensaje genérico
					errorMsj[strings.ToLower(errVal.Field())] = fmt.Sprintf("%s no es válido", errVal.Field())
				}
			}
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
	coo := f.Cookies("csrf")
	exp, t := helpers.Csrf.Get(coo)

	helpers.Csrf.Delete(coo)

	tok := helpers.Csrf.Gen()
	tiempo := time.Now().Add(time.Hour * 24)
	helpers.Csrf.Set(tok, tiempo.Unix())
	f.Cookie(&fiber.Cookie{
		Name:     "csrf",
		Value:    tok,
		Expires:  tiempo,
		HTTPOnly: true,
		Secure:   true,
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
