package val

import (
	"Jugueteria/config"
	"github.com/gofiber/fiber/v2"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

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
func ConfirmPassword[T any](str T) func(validator.FieldLevel) bool {
	return func(fl validator.FieldLevel) bool {
		val := reflect.ValueOf(str).Elem()
		passField := val.FieldByName("Password").String()
		field := fl.Field().String()
		p := strings.ToLower(passField)
		if field != p {
			return false
		}
		return true
	}
}
