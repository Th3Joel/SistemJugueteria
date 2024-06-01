package models

import (
	"time"
)

type Articles struct {
	ID          string `gorm:"primaryKey"`
	CategoryID  string `gorm:"size:255"`
	BoxID       string `gorm:"size:255"`
	Code        string `gorm:"size:255"`
	Description string
	State       int `gorm:"autoIncrement"`
	Stock       int
	SalePrice   float64
	Profit      float64
	CreatedAt   time.Time
	UpdateAt    time.Time `gorm:"autoUpdateTime"`

	DetailSale []DetailSale `gorm:"foreignKey:SaleID"`
}
