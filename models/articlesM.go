package models

import (
	"gorm.io/gorm"
)

type Articles struct {
	gorm.Model
	ID          string `gorm:"primaryKey"`
	CategoryID  string `gorm:"size:255"`
	BoxID       string `gorm:"size:255"`
	Code        string `gorm:"size:255"`
	Description string
	State       int `gorm:"default:0"`
	Stock       int
	SalePrice   float64
	Profit      float64
	//CreatedAt   time.Time
	//UpdateAt    time.Time `gorm:"autoUpdateTime"`

	DetailSale []DetailSale `gorm:"foreignKey:ArticleID"`
}
