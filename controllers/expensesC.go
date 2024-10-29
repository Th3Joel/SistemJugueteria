package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strconv"
	"time"

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

func (c ExpensesC) AllCashRegister(f *fiber.Ctx) error {
	config.DB.Model(c.Model).
		Where("cash_register_id = ?", f.Locals("cashRegisterId").(string)).
		Find(&c.Array)
	return f.JSON(types.Response{
		Status: true,
		Find:   c.Array,
	})
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
		db.Where("petty_cash_id = 1").Find(&c.Array)
	} else {
		query := "%" + q.Search + "%"
		db.Where(
			`
			petty_cash_id = 1
			AND(
				LOWER(num_invoice) LIKE LOWER(?)
				OR 
				LOWER(detail) LIKE LOWER(?)
				OR 
				LOWER(amount) LIKE LOWER(?)
				OR
				LOWER(created_at) LIKE LOWER(?)
			)
			`,
			query, query, query, query).
			Find(&c.Array)
	}
	config.DB.Model(c.Model).Select("COUNT(id) AS count").Where("petty_cash_id = 1").Count(&count)
	data := make([]interface{}, len(c.Array))
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

func (c ExpensesC) Save(f *fiber.Ctx, isCash bool) error {
	_ = f.BodyParser(&c)
	amount, _ := strconv.ParseFloat(c.Amount, 64)

	create := models.Expenses{
		ID:         uuid.NewString(),
		NumInvoice: c.NumInvoice,
		Detail:     c.Detail,
		Amount:     amount,
	}

	if isCash {
		create.CashRegisterID = f.Locals("cashRegisterId").(string)
	} else {
		create.PettyCashID = 1
	}

	if isCash {
		config.DB.Omit("petty_cash_id").Create(&create)
	} else {
		config.DB.Omit("cash_register_id").Create(&create)
	}

	if !isCash {

		petty := models.PettyCash{}
		sql := config.DB.First(&petty, 1)
		amo := petty.Balance - amount
		if amo < 0 {
			amo = 0
		}
		sql.Update("balance", amo)
	}

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso guardado",
	})
}

func (c ExpensesC) DeletePetty(f *fiber.Ctx) error {
	id := f.Params("id")
	sql := config.DB.Model(c.Model).
		Where("id = ?", id).
		First(&c)

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Egreso no encontrado",
		})
	}

	fecha, err := time.Parse(time.RFC3339, c.CreatedAt)
	if err != nil {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ocurrio un error en la fecha",
		})
	}
	fechaLimite := fecha.Add(2 * time.Hour)

	if fechaLimite.Before(time.Now()) {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Caducó el limite de anulación",
		})
	}

	sql2 := config.DB.
		Delete(&models.Expenses{}, "id = ?", c.ID)

	if sql2.RowsAffected == 0 {
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

func (c ExpensesC) Delete(f *fiber.Ctx) error {
	id := f.Params("id")
	sql := config.DB.Model(c.Model).
		Where("id = ?", id).
		First(&c)

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Egreso no encontrado",
		})
	}
	sql2 := config.DB.
		Delete(&models.Expenses{}, "id = ?", c.ID)

	if sql2.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se ha eliminado el egreso",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Detalle de egreso eliminado",
	})
}
