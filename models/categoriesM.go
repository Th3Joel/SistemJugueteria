package models

import (
	"gorm.io/gorm"
)

type Categories struct {
	gorm.Model
	ID          string `gorm:"primaryKey"`
	Name        string `gorm:"size:255"`
	Description string `gorm:"size:255"`
	//CreatedAt   time.Time
	//UpdateAt    time.Time `gorm:"autoUpdateTime"`

	Articles []Articles `gorm:"foreignKey:CategoryID"`
}
