package models

import (
	"time"
)

type Suppliers struct {
	ID        string `gorm:"primaryKey"`
	Company   string `gorm:"size:100"`
	Name      string `gorm:"size:100"`
	Email     string `gorm:"size:100"`
	Address   string `gorm:"size:100"`
	Phone     string `gorm:"size:100"`
	CreatedAt time.Time
	UpdateAt  time.Time `gorm:"autoUpdateTime"`

	//Purchases []Purchases `gorm:"foreignKey:SupplierID"`
}
