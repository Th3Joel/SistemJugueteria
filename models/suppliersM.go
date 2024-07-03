package models

import (
	"time"
)

type Suppliers struct {
	ID        string `gorm:"primaryKey"`
	Name      string
	Email     string
	Address   string
	Phone     string
	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	Purchases []Purchases `gorm:"foreignKey:SupplierID"`
}
