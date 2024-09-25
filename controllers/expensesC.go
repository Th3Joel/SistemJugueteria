package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ExpensesC struct {
	ID             string `json:"id"`
	CashRegisterID string `json:"cashRegisterID"`
	NumInvoice     string `json:"NumInvoice"`
	Detail         string `json:"Detail"`
	Amount         string `json:"Amount"`

	Array []ExpensesC     `json:"-" gorm:"-"`
	Model models.Expenses `json:"-" gorm:"-"`
}

func (c ExpensesC) All(f *fiber.Ctx) error {
	config.DB.Model(c.Model).
		Where("cash_register_id = ?", f.Locals("cashRegisterId").(string)).
		Find(&c.Array)
	return f.JSON(types.Response{
		Status: true,
		Find:   c.Array,
	})
}

func (c ExpensesC) Save(f *fiber.Ctx) error {
	_ = f.BodyParser(&c)
	amount, _ := strconv.ParseFloat(c.Amount, 64)
	config.DB.Create(&models.Expenses{
		ID:             uuid.NewString(),
		CashRegisterID: f.Locals("cashRegisterId").(string),
		NumInvoice:     c.NumInvoice,
		Detail:         c.Detail,
		Amount:         amount,
	})
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso guardado",
	})
}

func (c ExpensesC) Delete(f *fiber.Ctx) error {
	id := f.Params("id")
	config.DB.Delete(&models.Expenses{
		ID: id,
	})
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso eliminado",
	})
}
