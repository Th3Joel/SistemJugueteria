package val

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"reflect"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/go-playground/validator/v10"
)

// Validacion si existe un campo en la base de datos
func Exists[T any](model T, f *fiber.Ctx) func(validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		field := fl.Field().String()
		fieldName := strings.ToLower(fl.FieldName())
		sql := config.DB.Select(fieldName).First(&model, "LOWER("+fieldName+") = ?", field)
		return sql.RowsAffected == 1

	}
}

func ValToken() func(validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		tokenH := helpers.TokenH{}
		data := tokenH.Get(fl.Field().String())
		if data.Key == "" ||
			data.Exp < time.Now().Unix() ||
			!tokenH.Compare(fl.Field().String(), data.Key) {
			return false
		}
		return true
	}
}

// IsRepeat General
func IsRepeat[T any](model T, f *fiber.Ctx) func(validator.FieldLevel) bool {

	return func(fl validator.FieldLevel) bool {
		var id string
		if f.Params("id") != "" {
			id = f.Params("id")
		} else {
			id = f.Locals("userId").(string)
		}
		field := fl.Field().String()
		fieldName := strings.ToLower(fl.FieldName())

		sql := config.DB.Select(fieldName).First(&model, "LOWER("+fieldName+") = LOWER(?) AND id != ?", field, id)
		return sql.RowsAffected == 0
	}
}

// ConfirmPassword Validaciones de cuentas de usuario
func ConfirmPassword[T any](str *T) func(validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		val := reflect.ValueOf(str).Elem()
		passField := val.FieldByName("Password").String()
		field := fl.Field().String()
		if field != passField && field != "" {
			return false
		}
		return true
	}
}

// OmitCustom Ejemplo utilizando: Si los dos campos son vacíos, no se muestra el error de validación
// SI el campo password está lleno y el campo passwordConfirm está vacío, se muestra el error de validación
func OmitCustom[T any](str *T) func(level validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		val := reflect.ValueOf(str).Elem()
		field := val.FieldByName(fl.Param()).String()
		fieldCurrent := fl.Field().String()
		if field != "" && fieldCurrent == "" {
			return false // Muestra el error de validación
		}
		return true
	}
}

func Gt() func(fl validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		field := fl.Field().String()
		param, _ := strconv.ParseFloat(fl.Param(), 64)
		num, _ := strconv.ParseFloat(field, 64)

		if num < param {
			return false
		}
		return true
	}
}

func Integer() func(fl validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		field := fl.Field().String()
		_, err := strconv.Atoi(field)

		return err != nil
	}
}
