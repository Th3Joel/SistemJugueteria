package models

import "time"

type DetailPurchase struct {
	ID           string `gorm:"primaryKey"`
	PurchaseID   string `gorm:"size:255"`
	ArticleBoxID string `gorm:"size:255"`
	//Total        float64
	CreatedAt time.Time
	UpdatedAt time.Time `gorm:"autoUpdateTime"`

	ArticleBox ArticlesBox `gorm:"foreignKey:ArticleBoxID"`
}
