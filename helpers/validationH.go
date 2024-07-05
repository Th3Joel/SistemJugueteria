package helpers

import (
	"fmt"
	"github.com/go-playground/validator/v10"
)

func ParseMsj[T any](data T, validate *validator.Validate, valMsj map[string]string) (bool, map[string]string) {

	if err := validate.Struct(data); err != nil {
		// Crea un mapa para almacenar los mensajes de error de validación
		errorMsj := make(map[string]string)
		for _, errVal := range err.(validator.ValidationErrors) {
			// Crea la clave en el formato "campo.regla"
			key := fmt.Sprintf("%s.%s", errVal.StructField(), errVal.Tag())
			fmt.Println(key)
			// Verifica si hay un mensaje personalizado para esa clave
			if message, ok := valMsj[key]; ok {
				// Añade el mensaje de error personalizado al mapa de mensajes de error
				errorMsj[errVal.Field()] = message
			} else {
				// Si no hay un mensaje personalizado, añade un mensaje genérico
				errorMsj[errVal.Field()] = fmt.Sprintf("%s no es válido", errVal.Field())
			}
		}
		return true, errorMsj
	}
	return false, nil
}
