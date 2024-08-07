package models

import (
	"time"
)

type Users struct {
	ID        string `gorm:"primaryKey"`
	Name      string `gorm:"size:255"`
	Email     string `gorm:"size:255;unique"`
	Password  string `gorm:"size:255"`
	Role      string `gorm:"size:255"`
	Picture   string
	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	//Sales     []Sales     `gorm:"foreignKey:UserID"`
	//Purchases []Purchases `gorm:"foreignKey:UserID"`
}
