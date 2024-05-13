package val

type UserV struct {
	Name     string `validate:"required"`
	Email    string `validate:"required,email"`
	Password string `validate:"required,gte=4"`
	Role     string `validate:"required"`
	Picture  string `validate:"omitempty"`
}

// Mapa de mensajes de validación personalizados
var MsjUserVal = map[string]string{
	"Name.required":     "Correo requerido.",
	"Role.required":     "Correo requerido.",
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
	"Password.gte":      "La contraseña debe ser mayor o igual a 4.",
}

type AuthV struct {
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
}

var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}
