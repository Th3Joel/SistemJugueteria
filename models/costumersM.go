package models

import (
	"gorm.io/gorm"
)

type Costumers struct {
	gorm.Model
	ID      string `gorm:"primaryKey"`
	Name    string `gorm:"size:255"`
	Email   string `gorm:"size:255"`
	Address string `gorm:"size:255"`
	Phone   string `gorm:"size:255"`
	//CreatedAt time.Time
	//UpdateAt  time.Time `gorm:"autoUpdateTime"`

	Sales []Sales `gorm:"foreignKey:CostumerID"`
}
