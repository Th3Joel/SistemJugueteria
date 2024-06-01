package models

import (
	"time"
)

type Company struct {
	ID        string `gorm:"primaryKey"`
	Name      string `gorm:"size:255"`
	Address   string `gorm:"size:255"`
	Ruc       string `gorm:"size:255"`
	Email     string `gorm:"size:255"`
	Phone     string `gorm:"size:255"`
	Logo      string `gorm:"size:255"`
	CreatedAt time.Time
	UpdateAt  time.Time
}
