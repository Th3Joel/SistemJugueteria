package models

import "time"

type Costumers struct {
	ID        string `gorm:"primaryKey"`
	Name      string `gorm:"size:255"`
	Phone     string `gorm:"size:255"`
	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	//Sales []Sales `gorm:"foreignKey:CostumerID"`
}
