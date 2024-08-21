package models

import "time"

type Articles struct {
	ID            string `gorm:"primaryKey"`
	CategoryID    string `gorm:"size:255"`
	ArticleBoxID  string `gorm:"size:255"`
	Code          string `gorm:"size:255"`
	Description   string
	MinimunStock  int
	Stock         int
	SalePrice     float64
	PurchasePrice float64
	State         int `gorm:"default:1"`
	Profit        float64

	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	Category Category `gorm:"foreignKey:CategoryID"`
	//Article  ArticlesBox `gorm:"foreignKey:ArticleBoxID"`
	//DetailSale []DetailSale `gorm:"foreignKey:ArticleID"`
}
