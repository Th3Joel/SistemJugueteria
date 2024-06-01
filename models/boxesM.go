package models

import (
	"time"
)

type Boxes struct {
	ID                string `gorm:"primaryKey"`
	PurchaseID        string `gorm:"size:255"`
	Code              string `gorm:"size:255"`
	Weight            float64
	ToysQuantity      int
	Price             float64
	ToysPurchasePrice float64
	CreatedAt         time.Time
	UpdatedAt         time.Time `gorm:"autoUpdateTime"`

	Articles      []Articles        `gorm:"foreignKey:BoxID"`
	PriceCategory []PriceCategories `gorm:"foreignKey:BoxID"`
}
