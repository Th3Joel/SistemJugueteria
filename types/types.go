package types

type Response struct {
	Status bool        `json:"status"`
	Msj    string      `json:"msj,omitempty"`
	Find   interface{} `json:"find,omitempty"`
	All    *All        `json:"all,omitempty"`
}

type All struct {
	Data     []interface{} `json:"data"`
	Count    int64         `json:"count"`
	Pages    int           `json:"pages"`
	Page     int           `json:"page"`
	PageSize int           `json:"pageSize"`
}

type ParamsTable struct {
	Page     int    `query:"page"`
	PageSize int    `query:"pageSize"`
	Search   string `query:"search"`
}
