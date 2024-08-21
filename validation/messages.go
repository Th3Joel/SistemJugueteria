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
	"Phone.min":     "Longitud debe de ser de 8 dígitos",
	"Phone.max":     "Longitud debe de ser de 8 dígitos",
	"Address.lte":   "Caracteres máximo 50",
}

// MsjCostumerVal *Costumers
// Proveedor mensajes de validaciones
var MsjCostumerVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Name.isRepeat": "Nombre ya existe",
	"Phone.numeric": "Debe se numérico.",
	"Phone.min":     "Longitud debe de ser de 8 dígitos",
	"Phone.max":     "Longitud debe de ser de 8 dígitos",
}

// Company
var MsjCompanyVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Email.email":   "Correo inválido.",

	"Ruc.min": "Longitud debe de ser de 14 dígitos",
	"Ruc.max": "Longitud debe de ser de 14 dígitos",

	"Phone.numeric": "Debe se numérico.",
	"Phone.min":     "Longitud debe de ser de 8 dígitos",
	"Phone.max":     "Longitud debe de ser de 8 dígitos",

	"Address.lte": "Caracteres máximo 50",
}

// ArticleBox
var MsjArticleBoxVal = map[string]string{
	"Code.required": "Código requerido.",
	"Code.isRepeat": "Código ya existe",

	"Description.required": "Descripción requerida.",
	"Description.isRepeat": "Descripción ya existe",

	"ToysQuantity.required": "Cantidad requerida.",
	"ToysQuantity.integer":  "Solo se aceptan números enteros",
	"ToysQuantity.gtC":      "Cantidad debe ser mayor a 0",

	"PurchasePrice.required": "Precio requerido.",
	"PurchasePrice.numeric":  "Precio debe ser numérico",
	"PurchasePrice.gtC":      "Precio debe ser mayor 0",
}

// Category
var MsjCategoryVal = map[string]string{
	"Name.required": "Nombre requerido.",
	"Name.isRepeat": "Nombre ya existe",
}

// PriceCategory
var MsjPriceCategoryVal = map[string]string{
	"ArticleBoxID.required": "Caja de artículos requerido.",
	"Code.required":         "Código requerido.",
	"Code.isRepeat":         "Código ya existe",
	"Name.required":         "Nombre requerido.",
	"Name.isRepeat":         "Nombre ya existe",
	"Description.required":  "Descripción requerida.",

	"Stock.required":     "Cantidad requerida.",
	"Stock.integer":      "Solo se aceptan números enteros",
	"Stock.gtC":          "Cantidad debe ser mayor a 0",
	"SalePrice.required": "Precio requerido.",
	"SalePrice.numeric":  "Precio debe ser numérico",
	"SalePrice.gtC":      "Precio debe ser mayor 0",
}

// ArticleBox
var MsjArticleVal = map[string]string{
	"ArticleBoxID.required": "Caja de artículos requerido.",
	"CategoryID.required":   "Categoría requerida.",
	"Code.required":         "Código requerido.",
	"Code.isRepeat":         "Código ya existe",

	"Description.required": "Descripción requerida.",
	"Description.isRepeat": "Descripción ya existe",

	"MinimunStock.required": "Cantidad mínima requerida.",
	"MinimunStock.integer":  "Solo se aceptan números enteros",
	"MinimunStock.gtC":      "Cantidad mínima debe ser mayor a 2",

	"Stock.required": "Cantidad requerida.",
	"Stock.integer":  "Solo se aceptan números enteros",
	"Stock.gtC":      "Cantidad debe ser mayor a 0",
	//"Stock.toysQuantityCheck": "No mensaje",

	"SalePrice.required": "Precio requerido.",
	"SalePrice.numeric":  "Solo se aceptan números",
	"SalePrice.gtC":      "Precio debe ser mayor 0",
}

var MsjPasswordResetVal = map[string]string{
	"Code.required": "Código requerido.",
	"Code.valToken": "Código inválido",

	"Password.required": "La contraseña es requerida.",
	"Password.gte":      "La contraseña debe ser mayor o igual a 4.",

	"Confirm.required":      "Confirmación requerida.",
	"Confirm.confirmPasswd": "Las contraseñas no coinciden",
	"Confirm.omitCustom":    "Confirmación requerida",
}

var MsjForgotPasswordVal = map[string]string{
	"Email.required": "Email requerido.",
	"Email.email":    "Email no válido.",
	"Email.exists":   "Email no encontrado.",
}
