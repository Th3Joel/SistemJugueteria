package val

// MsjUserVal Mapa de mensajes de validación personalizados
var MsjUserVal = map[string]string{
	"Name.required":              "Nombre requerido.",
	"Role.required":              "Tipo de usuario requerido.",
	"Email.required":             "Correo requerido.",
	"Email.email":                "Correo inválido.",
	"Email.isRepeat":             "Este correo ya existe",
	"Password.valStrongPassword": "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales !@#$%^&",
	"Password.required":          "Contraseña requerida.",
	"Password.min":               "Debe tener al menos 6 caracteres",
	"Confirm.required":           "Confirmación requerida.",
	"Confirm.confirmPasswd":      "Las contraseñas no coinciden",
	"Confirm.omitCustom":         "Confirmación requerida",
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

	"PriceDollar.numeric":  "Debe ser numérico",
	"PriceDollar.required": "Campo requerido",
	"PriceDollar.gtC":      "Debe ser mayor a 35 córdobas",
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
	//"ArticleBoxID.required": "Caja de artículos requerido.",
	"CategoryID.required": "Categoría requerida.",
	"Code.required":       "Código requerido.",
	"Code.isRepeat":       "Código ya existe",

	"Description.required": "Descripción requerida.",
	"Description.isRepeat": "Descripción ya existe",

	"MinimunStock.integer": "Solo se aceptan números enteros",
	"MinimunStock.gtC":     "Cantidad debe ser mayor a 5",

	//"Stock.required": "Cantidad requerida.",
	"Stock.integer": "Solo se aceptan números enteros",
	"Stock.gtC":     "Cantidad debe ser mayor o igual a 0",
	//"Stock.toysQuantityCheck": "No mensaje",

	"SalePrice.required": "Precio requerido.",
	"SalePrice.numeric":  "Solo se aceptan números",
	"SalePrice.gtC":      "Precio debe ser mayor 0",
}

var MsjPasswordResetVal = map[string]string{
	"Code.required": "Código requerido.",
	"Code.valToken": "Código inválido",

	"Password.required":          "La contraseña es requerida.",
	"Password.min":               "Debe tener al menos 6 caracteres",
	"Password.valStrongPassword": "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales !@#$%^&",

	"Confirm.required":      "Confirmación requerida.",
	"Confirm.confirmPasswd": "Las contraseñas no coinciden",
	"Confirm.omitCustom":    "Confirmación requerida",
}

var MsjForgotPasswordVal = map[string]string{
	"Email.required": "Email requerido.",
	"Email.email":    "Email no válido.",
	"Email.exists":   "Email no encontrado.",
}

var MsjReqOpenCashVal = map[string]string{
	"InitialBalance.required": "Saldo inicial requerido.",
	"InitialBalance.numeric":  "Solo se aceptan números",
	"InitialBalance.gtC":      "Saldo debe ser mayor a 0",
}

var MsjExpensesVal = map[string]string{
	"NumInvoice.numeric": "Solo se aceptan números",
	"NumInvoice.gtC":     "N° Factura debe ser mayor a 0",

	"Detail.required": "Detalle requerido.",
	"Detail.max":      "El detalle no puede superar los 80 caracteres",

	"Amount.required": "Monto requerido.",
	"Amount.numeric":  "Solo se aceptan números",
	"Amount.gtC":      "Monto debe ser mayor a 0",
}

var MsjDenominationVal = map[string]string{

	"One.integer":         "Solo números enteros",
	"One.gtC":             "Billetes de 1 debe ser mayor a 0",
	"Five.integer":        "Solo números enteros",
	"Five.gtC":            "Billetes de 5 debe ser mayor a 0",
	"Ten.integer":         "Solo números enteros",
	"Ten.gtC":             "Billetes de 10 debe ser mayor a 0",
	"Twenty.integer":      "Solo números enteros",
	"Twenty.gtC":          "Billetes de 20 debe ser mayor a 0",
	"Fyfty.integer":       "Solo números enteros",
	"Fyfty.gtC":           "Billetes de 50 debe ser mayor a 0",
	"OneHundred.integer":  "Solo números enteros",
	"OneHundred.gtC":      "Billetes de 100 debe ser mayor a 0",
	"TwoHundred.integer":  "Solo números enteros",
	"TwoHundred.gtC":      "Billetes de 200 debe ser mayor a 0",
	"FiveHundred.integer": "Solo números enteros",
	"FiveHundred.gtC":     "Billetes de 500 debe ser mayor a 0",
	"OneThousand.integer": "Solo números enteros",
	"OneThousand.gtC":     "Billetes de 1000 debe ser mayor a 0",

	"TotalDollar.numeric":   "Solo se aceptan números",
	"TotalDollar.gtC":       "Total debe ser mayor a 0",
	"TotalCordoba.required": "Campo requerido.",
	"TotalCordoba.numeric":  "Solo se aceptan números",
	"TotalCordoba.gtC":      "Total debe ser mayor a 0",
}

var RefundsValidation = map[string]string{
	"Amount.required": "Campo requerido.",
	"Amount.numeric":  "Solo se aceptan números",
	"Amount.gtC":      "Monto debe ser mayor a 0",
	"Observation.max": "Máximo 80 caracteres",
}

var OtherInventoryOuputsValidation = map[string]string{
	"ArticleID.required": "Campo requerido.",
	"Quantity.required":  "Campo requerido.",
	"Quantity.numeric":   "Solo se aceptan números",
	"Quantity.gtC":       "Cantidad debe ser mayor a 0",
	"Reason.max":         "Máximo 80 caracteres",
	"Reason.required":    "Campo requerido.",
}
