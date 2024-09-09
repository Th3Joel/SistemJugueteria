package models

type Expenses struct {
	ID             string `gorm:"primaryKey"`
	CashRegisterID string `gorm:"size:255"`
	NumInvoice     string `gorm:"size:50"`
	Detail         string `gorm:"size:255"`
	Amount         float64
}
