package models

import (
	"gorm.io/gorm"
)

type PriceCategories struct {
	gorm.Model
	ID          string `gorm:"primaryKey"`
	BoxID       string `gorm:"size:255"`
	Name        string `gorm:"size:255"`
	Description string `gorm:"size:255"`
	Price       float64
	Stock       int
	//CreatedAt   time.Time
	//UpdateAt    time.Time `gorm:"autoUpdateTime"`

	DetailSale []DetailSale `gorm:"foreignKey:PriceCategoryID"`
}
