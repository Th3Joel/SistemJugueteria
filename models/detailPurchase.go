package models

import "time"

type DetailPurchase struct {
	ID         string `gorm:"primaryKey"`
	PurchaseID string `gorm:"size:255"`
	ArticleID  string `gorm:"size:255"`
	Price      float64
	Quantity   int
	Subtotal   float64
	CreatedAt  time.Time
	UpdatedAt  time.Time `gorm:"autoUpdateTime"`

	Article Articles `gorm:"foreignKey:ArticleID"`
}
