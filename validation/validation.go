package val

import (
	"Jugueteria/config"
	"strings"

	"github.com/go-playground/validator/v10"
)

func Repeat[T any](fl validator.FieldLevel, id string, model T) bool {

	field := fl.Field().String()
	fieldName := strings.ToLower(fl.FieldName())
	sql := config.DB.Select(fieldName).First(&model, "LOWER("+fieldName+") = LOWER(?) AND id != ?", field, id)
	return sql.RowsAffected == 0
}

//*Usuario

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

// *Authentication
// Validaciones del login mensajes
var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}

// *Proveedor
// Proveedor mensajes de validaciones
var MsjProveedorVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Name.isRepeat": "Nombre ya existe",
	"Email.email":   "Correo inválido.",
	"Phone.numeric": "Debe se numérico.",
	"Address.lte":   "Caracteres máximo 50",
}
