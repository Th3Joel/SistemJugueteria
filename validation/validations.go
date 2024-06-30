package val

// *Usuario

type UserPut struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role"`
	Picture  string `json:"picture"`
	Email    string `json:"email" validate:"required,email,isRepeat"`
	Password string `json:"password" validate:"omitempty,gte=4"`
	Confirm  string `json:"confirm" validate:"omitempty,confirmPasswd"`
}

type UserPost struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role" validate:"required"`
	Picture  string `json:"picture"`
	Password string `json:"password" validate:"required,gte=4"`
	Email    string `json:"email" validate:"required,email,isRepeat"`
	Confirm  string `json:"confirm" validate:"required,confirmPasswd"`
}
