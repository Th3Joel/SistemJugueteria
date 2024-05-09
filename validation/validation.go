package val

type AccountV struct {
	Email    string `validate:"required,email"`
	Password string `validate:"required,gte=4"`
}

// Mapa de mensajes de validación personalizados
var MsjAccountVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
	"Password.gte":      "La contraseña debe ser mayor o igual a 4.",
}

type AuthV struct {
	Email    string `validate:"required,email"`
	Password string `validate:"required"`
}

var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}
