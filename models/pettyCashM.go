package models

import "time"

type PettyCash struct {
	ID             int `gorm:"primaryKey"`
	InitialBalance float64
	Balance        float64
	Limit          float64

	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	Refunds  []Refund   `gorm:"foreignKey:PettyCashID"`
	Expenses []Expenses `gorm:"foreignKey:PettyCashID"`
}
