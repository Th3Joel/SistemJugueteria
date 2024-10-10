package models

type Denomination struct {
	ID                    string `gorm:"primaryKey"`
	CashRegisterID        string `gorm:"size:255"`
	ComesWithDenomination string `gorm:"size:5"`
	ZeroPointFive         float64
	One                   int64
	Five                  int64
	Ten                   int64
	Twenty                int64
	Fyfty                 int64
	OneHundred            int64
	TwoHundred            int64
	FiveHundred           int64
	OneThousand           int64
	TotalDollar           float64
	TotalCordoba          float64
}
