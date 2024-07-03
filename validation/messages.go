package val

// MsjUserVal Mapa de mensajes de validación personalizados
var MsjUserVal = map[string]string{
	"Name.required":         "Nombre requerido.",
	"Role.required":         "Tipo de usuario requerido.",
	"Email.required":        "Correo requerido.",
	"Email.email":           "Correo inválido.",
	"Email.isRepeat":        "Este correo ya existe",
	"Password.required":     "Contraseña requerida.",
	"Password.gte":          "La contraseña debe ser mayor o igual a 4.",
	"Confirm.required":      "Confirmación requerida.",
	"Confirm.confirmPasswd": "Las contraseñas no coinciden",
	"Confirm.omitCustom":    "Confirmación requerida",
}

// MsjAuthVal *Authentication
// Validaciones del login mensajes
var MsjAuthVal = map[string]string{
	"Email.required":    "Correo requerido.",
	"Email.email":       "Correo inválido.",
	"Password.required": "La contraseña es requerida.",
}

// MsjProveedorVal *Proveedor
// Proveedor mensajes de validaciones
var MsjProveedorVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Name.isRepeat": "Nombre ya existe",
	"Email.email":   "Correo inválido.",
	"Phone.numeric": "Debe se numérico.",
	"Address.lte":   "Caracteres máximo 50",
}

// MsjCostumerVal *Costumers
// Proveedor mensajes de validaciones
var MsjCostumerVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Name.isRepeat": "Nombre ya existe",
	"Surname.lte":   "Caracteres maximo 20",
	"Email.email":   "Correo inválido.",
	"Phone.numeric": "Debe se numérico.",
	"Address.lte":   "Caracteres máximo 50",
}

// Company
var MsjCompanyVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Email.email":   "Correo inválido.",
	"Phone.numeric": "Debe se numérico.",
	"Address.lte":   "Caracteres máximo 50",
}
