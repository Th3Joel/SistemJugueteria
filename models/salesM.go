package models

import (
	"time"
)

type Sales struct {
	ID             string `gorm:"primaryKey"`
	CashRegisterID string `gorm:"size:255"`
	CostumerID     string `gorm:"size:255"`
	UserID         string `gorm:"size:255"`
	Code           int
	State          int `gorm:"default:1"`
	DiscountTotal  float64
	Neto           float64
	Total          float64
	CashCordoba    float64
	CashDollar     float64
	Exchange       float64
	CreatedAt      time.Time
	UpdateAt       time.Time `gorm:"autoUpdateTime"`

	Costumer Costumers `gorm:"foreignKey:CostumerID"`
	//User     Users     `gorm:"foreignKey:UserID"`

	DetailSale []DetailSale `gorm:"foreignKey:SaleID"`
}
