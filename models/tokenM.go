package models

import (
	"time"
)

type Token struct {
	ID        string  `gorm:"primaryKey"`
	UserID    string  `gorm:"size:255"`
	Token     string  `gorm:"size:255"`
	IP        *string `gorm:"size:255"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
