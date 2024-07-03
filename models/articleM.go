package models

import "time"

type Articles struct {
	ID            string `gorm:"primaryKey"`
	CategoryID    string `gorm:"size:255"`
	ArticleBoxID  string `gorm:"size:255"`
	Code          string `gorm:"size:255"`
	Description   string
	Stock         int
	SalePrice     float64
	PurchasePrice float64
	State         int `gorm:"default:0"`
	Profit        float64
	CreatedAt     time.Time
	UpdateAt      time.Time `gorm:"autoUpdateTime"`

	DetailSale []DetailSale `gorm:"foreignKey:ArticleID"`
}
