package models

import (
	"time"
)

type Purchases struct {
	ID         string `gorm:"primaryKey"`
	UserID     string `gorm:"size:255"`
	SupplierID string `gorm:"size:255"`
	Code       int
	Amount     int
	Total      float64
	CreatedAt  time.Time
	UpdatedAt  time.Time `gorm:"autoUpdateTime"`

	User     Users     `gorm:"foreignKey:UserID"`
	Supplier Suppliers `gorm:"foreignKey:SupplierID"`

	DetailPurchase []DetailPurchase `gorm:"foreignKey:PurchaseID"`
}
