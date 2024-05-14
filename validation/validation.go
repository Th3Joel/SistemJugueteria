package val

import (
	"Jugueteria/config"
	"Jugueteria/models"

	"github.com/go-playground/validator/v10"
)

// Mapa de mensajes de validación personalizados
var MsjUserVal = map[string]string{
	"Name.required":     "Correo requerido.",
	"Role.required":     "Correo requerido.",
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Email.isRepeat":    "Este correo ya existe",
	"Password.required": "La contraseña es requerida.",
	"Password.gte":      "La contraseña debe ser mayor o igual a 4.",
}

func EmailRepeat(fl validator.FieldLevel) bool {
	field := fl.Field().String()
	sql := config.DB.Select("email").First(models.User{}, "email = ?", field)
	return sql.RowsAffected == 0
}

// Validaciones del login
var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}
