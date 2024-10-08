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
	Name        string `validate:"required"`
	Ruc         string `validate:"omitempty,min=14,max=14"`
	Phone       string `validate:"omitempty,numeric,min=8,max=8"`
	Address     string `validate:"omitempty,max=50"`
	Email       string `validate:"omitempty,email"`
	PriceDollar string `validate:"omitempty,numeric,gtC=35"`
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
	Code          string `validate:"required,isRepeat"`
	Description   string `validate:"required,isRepeat"`
	ToysQuantity  string `validate:"omitempty,integer,gtC=-1"`
	PurchasePrice string `validate:"omitempty,numeric,gtC=-1"`
}

// Article
type ArticlePost struct {
	//ArticleBoxID string `validate:"required"`
	CategoryID   string `validate:"required"`
	Code         string `validate:"required,isRepeat"`
	Description  string `validate:"required,isRepeat"`
	MinimunStock string `validate:"omitempty,integer,gtC=4"`
	Stock        string `validate:"omitempty,integer,gtC=-1"`
	SalePrice    string `validate:"omitempty,numeric,gtC=0"`
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
	Stock        string `validate:"required,integer,gtC=0"`
	SalePrice    string `validate:"required,numeric,gtC=0"`
}

type PasswordReset struct {
	Code     string `validate:"required,valToken"`
	Password string `validate:"required,gte=4"`
	Confirm  string `validate:"required,confirmPasswd"`
}

type ForgotPassword struct {
	Email string `validate:"required,email,exists"`
}

// ReqOpenCash

type ReqOpenCash struct {
	InitialBalance string `validate:"required,numeric,gtC=0"`
}

// Expenses
type Expenses struct {
	NumInvoice string `validate:"omitempty,numeric,gtC=0"`
	Detail     string `validate:"required,max=80"`
	Amount     string `validate:"required,numeric,gtC=0"`
}

// Denomination
type Denomination struct {
	One          string `validate:"omitempty,integer,gtC=0"`
	Five         string `validate:"omitempty,integer,gtC=0"`
	Ten          string `validate:"omitempty,integer,gtC=0"`
	Twenty       string `validate:"omitempty,integer,gtC=0"`
	Fyfty        string `validate:"omitempty,integer,gtC=0"`
	OneHundred   string `validate:"omitempty,integer,gtC=0"`
	TwoHundred   string `validate:"omitempty,integer,gtC=0"`
	FiveHundred  string `validate:"omitempty,integer,gtC=0"`
	OneThousand  string `validate:"omitempty,integer,gtC=0"`
	TotalDollar  string `validate:"omitempty,integer,gtC=0"`
	TotalCordoba string `validate:"required,numeric,gtC=0"`
}

// Refund
type Refund struct {
	Amount      string `validate:"required,numeric,gtC=0"`
	Observation string `validate:"omitempty,max=80"`
}

//OtherInventoryOuputs

type OtherInventoryOuputs struct {
	ArticleID string `validate:"required"`
	Quantity  string `validate:"required,numeric,gtC=0"`
	Reason    string `validate:"required,max=80"`
}
