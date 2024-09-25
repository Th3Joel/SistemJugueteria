package models

import (
	"time"
)

type Purchases struct {
	ID           string `gorm:"primaryKey"`
	UserID       string `gorm:"size:255"`
	SupplierID   string `gorm:"size:255"`
	ArticleBoxID string `gorm:"size:255"`
	State        int    `gorm:"default:0"`
	Code         int
	Total        float64
	CreatedAt    time.Time
	UpdatedAt    time.Time `gorm:"autoUpdateTime"`

	User       Users       `gorm:"foreignKey:UserID"`
	Supplier   Suppliers   `gorm:"foreignKey:SupplierID"`
	ArticleBox ArticlesBox `gorm:"foreignKey:ArticleBoxID"`

	DetailPurchase []DetailPurchase `gorm:"foreignKey:PurchaseID"`
}
