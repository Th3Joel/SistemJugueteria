package models

import (
	"gorm.io/gorm"
)

type DetailPurchase struct {
	gorm.Model
	ID         string `gorm:"primaryKey"`
	PurchaseID string `gorm:"size:255"`
	BoxID      string `gorm:"size:255"`
	Total      float64
	//CreatedAt  time.Time
	//UpdatedAt  time.Time `gorm:"autoUpdateTime"`
}
