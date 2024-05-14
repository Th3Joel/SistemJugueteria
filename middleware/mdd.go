package mdd

import (
	"Jugueteria/config"
	"Jugueteria/models"
	val "Jugueteria/validation"
	"encoding/json"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

func AuthMiddleware(c *fiber.Ctx) error {
	// Obtiene el token de la cabecera de autorización
	token := c.Get("key")

	//Verificar si el token esta almacenado
	modelToken := &models.Token{}
	db := config.DB.First(modelToken, "token = ?", token)

	// Cargar la clave secreta
	key, _ := jwk.FromRaw([]byte("ksnbkajgrkyg7a874ylha"))

	// Verifica si el token es válido
	t, err := jwt.Parse([]byte(token), jwt.WithKey(jwa.HS256, key))
	// Verificacion
	if token == "" || err != nil || db.RowsAffected == 0 {
		// Si el token no es válido, responde con un error de autorización
		return c.JSON(fiber.Map{
			"status": false,
			"error":  "No autorizado",
		})
	}
	//Para imprimir en json
	jsonClaims, _ := json.Marshal(t)
	fmt.Println(string(jsonClaims))
	//Almacenar lso datos en la req
	tokeData := t.PrivateClaims()
	c.Locals("userId", tokeData["id"])
	// Si el token es válido, permite continuar con la solicitud
	return c.Next()
}

func ValM(data interface{}, valMsj map[string]string) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		validate := validator.New()
		validate.RegisterValidation("isRepeat", val.EmailRepeat)

		/*La variable v se inicializa utilizando reflexión.
		Crea una nueva instancia del tipo del parámetro data
		utilizando reflect.New(reflect.TypeOf(data)).Interface().
		 Esto permite que el middleware funcione con cualquier
		 estructura de datos pasada.*/

		v := reflect.New(reflect.TypeOf(data)).Interface()

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
