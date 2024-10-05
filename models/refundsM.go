package models

import "time"

type Refund struct {
	ID          string `gorm:"primaryKey"`
	PettyCashID int    `gorm:"size:255"`
	Amount      float64
	Observation string

	CreatedAt time.Time
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
