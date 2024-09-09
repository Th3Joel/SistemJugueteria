package models

import "time"

type CashRegister struct {
	ID               string `gorm:"primaryKey"`
	UserID           string `gorm:"size:255,unique"`
	State            int    `gorm:"default:1"`
	InitialBalance   float64
	TotalCashBalance float64
	ClosedAt         *time.Time
	CreatedAt        time.Time

	Sales        []Sales      `gorm:"foreignKey:CashRegisterID"`
	Expenses     Expenses     `gorm:"foreignKey:CashRegisterID"`
	Denomination Denomination `gorm:"foreignKey:CashRegisterID"`
}
