package val

// *Usuario

type UserPut struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role"`
	Picture  string `json:"picture"`
	Email    string `json:"email" validate:"required,email,isRepeat"`
	Password string `json:"password" validate:"omitempty,gte=4"`
	Confirm  string `json:"confirm" validate:"omitCustom=Password,confirmPasswd"`
}

type UserPost struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role" validate:"required"`
	Picture  string `json:"picture"`
	Password string `json:"password" validate:"required,gte=4"`
	Email    string `json:"email" validate:"required,email,isRepeat"`
	Confirm  string `json:"confirm" validate:"required,confirmPasswd"`
}

// CostumerPost Costumers
type CostumerPost struct {
	Name    string `json:"name" validate:"required,isRepeat"`
	Address string `json:"address" validate:"omitempty,lte=50"`
	Phone   string `json:"phone" validate:"omitempty,numeric"`
	Email   string `json:"email" validate:"omitempty,email"`
}

// CompanyPost
type CompanyPost struct {
	Name    string `json:"name" validate:"required"`
	Ruc     string `json:"ruc"`
	Phone   string `json:"phone" validate:"omitempty,numeric"`
	Address string `json:"address" validate:"omitempty,lte=50"`
	Email   string `json:"email" validate:"omitempty,email"`
}

// SupplierPost
type SupplierPost struct {
	Name    string `json:"name" validate:"required,isRepeat"`
	Address string `json:"address" validate:"omitempty,lte=50"`
	Phone   string `json:"phone" validate:"omitempty,numeric"`
	Email   string `json:"email" validare:"omitempty,email"`
}
