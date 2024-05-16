package val

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"fmt"

	"github.com/go-playground/validator/v10"
)

type UserPut struct {
	Name    string `json:"name"`
	Role    string `json:"role"`
	Picture string `json:"picture"`
	Email   string `json:"email" validate:"email,isRepeat"`
}
type UserPost struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role" validate:"required"`
	Picture  string `json:"picture"`
	Password string `json:"password" validate:"required,gte=4"`
	Email    string `json:"email" validate:"required,email,isRepeat"`
}

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

func EmailRepeat(fl validator.FieldLevel, id string) bool {
	field := fl.Field().String()
	fmt.Println(field)
	sql := config.DB.Select("email").First(&models.User{}, "email = ? AND id != ?", field, id)
	return sql.RowsAffected == 0
}

// Validaciones del login
var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}
