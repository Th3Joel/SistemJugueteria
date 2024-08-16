package val

// *Usuario

type UserPut struct {
	Name     string `validate:"required"`
	Role     string
	Picture  string
	Email    string `validate:"required,email,isRepeat"`
	Password string `validate:"omitempty,gte=4"`
	Confirm  string `validate:"omitCustom=Password,confirmPasswd"`
}

type UserPost struct {
	Name     string `validate:"required"`
	Role     string `validate:"required"`
	Picture  string
	Password string `validate:"required,gte=4"`
	Email    string `validate:"required,email,isRepeat"`
	Confirm  string `validate:"required,confirmPasswd"`
}

// CostumerPost Costumers
type CostumerPost struct {
	Name  string `validate:"required,isRepeat"`
	Phone string `validate:"omitempty,numeric,min=8,max=8"`
}

// CompanyPost
type CompanyPost struct {
	Name    string `validate:"required"`
	Ruc     string
	Phone   string `validate:"omitempty,numeric,min=8,max=8"`
	Address string `validate:"omitempty,max=50"`
	Email   string `validate:"omitempty,email"`
}

// SupplierPost
type SupplierPost struct {
	Name    string `validate:"required,isRepeat"`
	Address string `validate:"omitempty,lte=50"`
	Phone   string `validate:"omitempty,numeric,min=8,max=8"`
	Email   string `validate:"omitempty,email"`
}

// ArticleBoxPost
type ArticleBoxPost struct {
	Code        string `validate:"required,isRepeat"`
	Description string `validate:"required,isRepeat"`
	//ToysQuantity  string `validate:"required,integer,gtC=1"`
	PurchasePrice string `validate:"required,numeric,gtC=1"`
}

// Article
type ArticlePost struct {
	ArticleBoxID string `validate:"required"`
	CategoryID   string `validate:"required"`
	Code         string `validate:"required,isRepeat"`
	Description  string `validate:"required,isRepeat"`
	Stock        string `validate:"required,integer,gtC=1"`
	SalePrice    string `validate:"required,numeric,gtC=1"`
}

// CategoryPost
type CategoryPost struct {
	Name        string `validate:"required,isRepeat"`
	Description string
}

// PriceCategoryPost
type PriceCategoryPost struct {
	ArticleBoxID string `validate:"required"`
	Code         string `validate:"required,isRepeat"`
	Name         string `validate:"required,isRepeat"`
	Description  string `validate:"required"`
	Stock        string `validate:"required,integer,gtC=1"`
	SalePrice    string `validate:"required,numeric,gtC=1"`
}

type PasswordReset struct {
	Code     string `validate:"required,valToken"`
	Password string `validate:"required,gte=4"`
	Confirm  string `validate:"required,confirmPasswd"`
}

type ForgotPassword struct {
	Email string `validate:"required,email,exists"`
}
