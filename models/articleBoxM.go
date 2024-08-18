package models

import "time"

type ArticlesBox struct {
	ID            string `gorm:"primaryKey"`
	Code          string `gorm:"size:255"`
	Description   string `gorm:"size:255"`
	ToysQuantity  int64
	PurchasePrice float64
	CreatedAt     time.Time
	UpdatedAt     time.Time `gorm:"autoUpdateTime"`

	Articles []Articles `gorm:"foreignKey:ArticleBoxID"`
	//PriceCategory []PriceCategories `gorm:"foreignKey:ArticleBoxID"`
	//Purchases     []DetailPurchase  `gorm:"foreignKey:ArticleBoxID"`
}
