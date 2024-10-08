package models

import "time"

type OtherInventoryOutput struct {
	ID        string `gorm:"primaryKey"`
	ArticleID string `gorm:"size:255"`
	Quantity  int
	Reason    string `gorm:"size:255"`

	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	Article Articles `gorm:"foreignKey:ArticleID"`
}
