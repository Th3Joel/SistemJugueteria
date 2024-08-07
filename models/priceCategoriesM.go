package models

import (
	"time"
)

type PriceCategories struct {
	ID           string `gorm:"primaryKey"`
	ArticleBoxID string `gorm:"size:255"`
	Code         string `gorm:"size:255"`
	Name         string `gorm:"size:255"`
	Description  string `gorm:"size:255"`
	SalePrice    float64
	Stock        int
	CreatedAt    time.Time
	UpdateAt     time.Time `gorm:"autoUpdateTime"`

	ArticleBox ArticlesBox `gorm:"foreignKey:ArticleBoxID"`

	//DetailSale []DetailSale `gorm:"foreignKey:PriceCategoryID"`
}
