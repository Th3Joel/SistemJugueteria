package models

import (
	"time"
)

type DetailSale struct {
	ID              string `gorm:"primaryKey"`
	SaleID          string `gorm:"size:255"`
	ArticleID       string `gorm:"size:255"`
	PriceCategoryID string `gorm:"size:255"`
	Amount          int
	Subtotal        float64
	Profit          float64
	Discount        float64
	CreatedAt       time.Time
	UpdatedAt       time.Time `gorm:"autoUpdateTime"`

	Article Articles `gorm:"foreignKey:ArticleID"`
}
