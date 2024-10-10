package models

import "time"

type Expenses struct {
	ID             string `gorm:"primaryKey"`
	CashRegisterID string `gorm:"size:255"`
	PettyCashID    int
	NumInvoice     string `gorm:"size:50"`
	Detail         string `gorm:"size:255"`
	Amount         float64

	CreatedAt time.Time
	UpdatedAt time.Time `gorm:"autoUpdateTime"`

	CashRegister CashRegister `gorm:"foreignKey:CashRegisterID"`
}
