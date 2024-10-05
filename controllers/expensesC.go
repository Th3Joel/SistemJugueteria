package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
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
	CreatedAt      string `json:"Date"`

	Array []ExpensesC     `json:"-" gorm:"-"`
	Model models.Expenses `json:"-" gorm:"-"`
}

func (c ExpensesC) All(f *fiber.Ctx) error {
	db := config.DB.Model(c.Model)
	var count int64
	var q types.ParamsTable
	_ = f.QueryParser(&q)
	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Order("created_at DESC").
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		db.Find(&c.Array)
	} else {
		query := "%" + q.Search + "%"
		db.Where(
			`num_invoice LIKE ? 
			 OR 
			 LOWER(detail) LIKE LOWER(?)
			 OR 
			 amount LIKE ?
			`,
			query, query, query).
			Find(&c.Array)
	}
	db.Count(&count)
	data := make([]interface{}, count)
	for i, v := range c.Array {
		data[i] = v
	}
	return f.Status(200).JSON(types.Response{
		Status: true,
		All: &types.All{
			Data:     data,
			Count:    count,
			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})

}

func (c ExpensesC) Save(f *fiber.Ctx) error {
	_ = f.BodyParser(&c)
	amount, _ := strconv.ParseFloat(c.Amount, 64)
	db := config.DB.Create(&models.Expenses{
		ID:          uuid.NewString(),
		PettyCashID: 1,
		NumInvoice:  c.NumInvoice,
		Detail:      c.Detail,
		Amount:      amount,
	})
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se ha guardado el egreso",
		})
	}
	petty := models.PettyCash{}
	sql := config.DB.First(&petty, 1)
	amo := petty.Balance - amount
	if amo < 0 {
		amo = 0
	}
	sql.Update("balance", amo)
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso guardado",
	})
}

func (c ExpensesC) Delete(f *fiber.Ctx) error {
	id := f.Params("id")
	sql := config.DB.Model(c.Model).
		Where("id = ?", id).
		First(&c).
		Delete(&models.Expenses{})
	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se ha eliminado el egreso",
		})
	}

	amount, _ := strconv.ParseFloat(c.Amount, 64)
	petty := models.PettyCash{}
	sql = config.DB.First(&petty, 1)
	amo := petty.Balance + amount
	if amo > petty.InitialBalance {
		amo = petty.InitialBalance
	}
	sql.Update("balance", amo)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso eliminado",
	})
}
