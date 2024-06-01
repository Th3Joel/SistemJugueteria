package models

import (
	"time"
)

type Sales struct {
	ID         string `gorm:"primaryKey"`
	UserID     string `gorm:"size:255"`
	CostumerID string `gorm:"size:255"`
	Code       int
	State      int `gorm:"default:0"`
	Discount   float64
	Neto       float64
	Total      float64
	CreatedAt  time.Time
	UpdateAt   time.Time `gorm:"autoUpdateTime"`

	DetailSale []DetailSale `gorm:"foreignKey:SaleID"`
}
