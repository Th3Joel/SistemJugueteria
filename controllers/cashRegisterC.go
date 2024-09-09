package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CashRegisterC struct {
	ID               string `json:"id"`
	UserID           string `json:"userID"`
	State            string `json:"state"`
	InitialBalance   string `json:"initialBalance"`
	TotalCashBalance string `json:"totalCashBalance"`
	ClosedAt         string `json:"closedAt"`
	CreatedAt        string `json:"createdAt"`

	Expenses []Expenses `json:"expenses,omitempty" gorm:"foreignKey:CashRegisterID"`

	Model models.CashRegister `json:"-" gorm:"-"`
	// Sales        []Sales      `json:"sale" gorm:"foreignKey:CashRegisterID"`
	// Expenses     Expenses     `json:"expense" gorm:"foreignKey:CashRegisterID"`
	// Denomination Denomination `json:"denomination" gorm:"foreignKey:CashRegisterID"`
}

type Expenses struct {
	ID             string `json:"-"`
	CashRegisterID string `json:"cashRegisterID"`
	Total          string `json:"total"`
	NumInvoice     string `json:"numInvoice"`
	Detail         string `json:"detail"`
	Amount         string `json:"amount"`
}

type DetailExpenses struct {
}

func (c CashRegisterC) Verify(f *fiber.Ctx) error {
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Passed",
	})
}

func (c CashRegisterC) Save(f *fiber.Ctx) error {

	_ = f.BodyParser(&c)
	initialBalance, _ := strconv.ParseFloat(c.InitialBalance, 64)
	config.DB.Create(&models.CashRegister{
		ID:             uuid.NewString(),
		UserID:         f.Locals("userId").(string),
		InitialBalance: initialBalance,
		CreatedAt:      time.Now(),
	})

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Caja abierta",
	})
}

func (c CashRegisterC) Show(f *fiber.Ctx) error {
	db := config.DB.Model(c.Model)

	db.
		Where("user_id = ? AND state != 0", f.Locals("userId").(string)).First(&c)
	return f.JSON(types.Response{
		Status: true,
		Find:   c,
	})
}

func (c CashRegisterC) Close(f *fiber.Ctx) error {
	config.DB.Model(c.Model).Update("state", 0)
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Caja cerrada",
	})
}
