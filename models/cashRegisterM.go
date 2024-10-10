package models

import "time"

type CashRegister struct {
	ID                string `gorm:"primaryKey"`
	UserID            string `gorm:"size:255"`
	State             int    `gorm:"default:1"`
	InitialBalance    float64
	TotalSales        float64
	TotalExpenses     float64
	TotalCordobas     float64
	MissingInCordobas float64
	CordobasSurplus   float64
	TotalDollars      float64
	MissingInDollars  float64
	DollarsSurplus    float64
	ClosedAt          *time.Time
	CreatedAt         time.Time

	Users Users   `gorm:"foreignKey:UserID"`
	Sales []Sales `gorm:"foreignKey:CashRegisterID"`
	//Expenses     Expenses     `gorm:"foreignKey:CashRegisterID"`
	Denomination Denomination `gorm:"foreignKey:CashRegisterID"`
}
