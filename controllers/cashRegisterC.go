package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"math"
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
	TotalSales       string `json:"totalSales"`

	CashCordobaTotal string `json:"cashCordobaTotal" gorm:"-"`
	CashDollarTotal  string `json:"cashDollarTotal" gorm:"-"`

	ClosedAt  string `json:"closedAt"`
	CreatedAt string `json:"createdAt"`

	Denomination Denomination        `json:"denomination,omitempty" gorm:"foreignKey:CashRegisterID"`
	Users        Users               `json:"user" gorm:"foreignKey:UserID"`
	Model        models.CashRegister `json:"-" gorm:"-"`
	Array        []CashRegisterC     `json:"-" gorm:"-"`
	// Sales        []Sales      `json:"sale" gorm:"foreignKey:CashRegisterID"`
	Expenses Expenses `json:"expense" gorm:"foreignKey:CashRegisterID"`
	// Denomination Denomination `json:"denomination" gorm:"foreignKey:CashRegisterID"`
}

type Expenses struct {
	ID             string `json:"-"`
	CashRegisterID string `json:"-"`
	NumInvoice     string `json:"NumInvoice"`
	Detail         string `json:"Detail"`
	Amount         string `json:"Amount"`
}

type Users struct {
	ID   string `json:"-"`
	Name string `json:"name"`
}

type Denomination struct {
	CashRegisterID string `json:"-"`
	One            string `json:"One"`
	Five           string `json:"Five"`
	Ten            string `json:"Ten"`
	Twenty         string `json:"Twenty"`
	Fyfty          string `json:"Fyfty"`
	OneHundred     string `json:"OneHundred"`
	TwoHundred     string `json:"TwoHundred"`
	FiveHundred    string `json:"FiveHundred"`
	OneThousand    string `json:"OneThousand"`
	TotalDollar    string `json:"TotalDollar"`
	TotalCordoba   string `json:"TotalCordoba"`
	Total          string `json:"Total"`
}

func (c CashRegisterC) All(f *fiber.Ctx, my bool) error {
	db := config.DB.Model(c.Model)
	var count int64
	var q types.ParamsTable
	_ = f.QueryParser(&q)
	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	if my {
		id := f.Locals("userId").(string)
		db.Where("user_id = ?", id)
	} else {
		db.Preload("Users")
	}
	db.
		Order("created_at DESC").
		Offset(skip).
		Limit(take)

	if q.Search == "" {
		db.Find(&c.Array)
	} else {
		query := "%" + q.Search + "%"
		db.Where(
			`created_at LIKE ? 
			 OR 
			 DATE_FORMAT(created_at, '%l %p') LIKE ?
			 OR
			 closed_at LIKE ? 
			 OR 
			 DATE_FORMAT(closed_at, '%l %p') LIKE ?
			 OR
			 initial_balance LIKE ?
			 OR
			 (case
			 	WHEN 'abierto' LIKE ? THEN '1'
				WHEN 'cerrado' LIKE ? THEN '0'
			 END) = state
			`,
			query, query, query, query, query, query, query).
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

func (c CashRegisterC) Verify(f *fiber.Ctx) error {
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Passed",
	})
}

func (c CashRegisterC) Save(f *fiber.Ctx) error {

	_ = f.BodyParser(&c)
	initialBalance, _ := strconv.ParseFloat(c.InitialBalance, 64)
	sql := config.DB.Create(&models.CashRegister{
		ID:             uuid.NewString(),
		UserID:         f.Locals("userId").(string),
		InitialBalance: initialBalance,
		CreatedAt:      time.Now(),
	})

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error al abrir caja",
		})
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Caja abierta",
	})
}

func (c CashRegisterC) Show(f *fiber.Ctx) error {
	cashTotal := struct {
		CashCordobaTotal float64
		CashDollarTotal  float64
	}{}
	config.DB.Model(models.Sales{}).
		Select("SUM(cash_cordoba - exchange) as CashCordobaTotal, SUM(cash_dollar) as CashDollarTotal").
		Where("cash_register_id = ?", f.Locals("cashRegisterId").(string)).
		Scan(&cashTotal)
	db := config.DB.Model(c.Model)
	db.
		Preload("Users").
		Where("user_id = ? AND state != 0", f.Locals("userId").(string)).
		First(&c)
	c.CashCordobaTotal = fmt.Sprintf("%.2f", cashTotal.CashCordobaTotal)
	c.CashDollarTotal = fmt.Sprintf("%.2f", cashTotal.CashDollarTotal)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontró una caja abierta",
		})
	}
	return f.JSON(types.Response{
		Status: true,
		Find:   c,
	})
}

func (c CashRegisterC) ShowId(f *fiber.Ctx, my bool) error {
	id := f.Params("id")
	idUser := f.Locals("userId").(string)

	sql := config.DB.
		Model(c.Model).
		Preload("expenses").
		Preload("Users").
		Preload("Denomination")
	if my {
		sql.Where("id = ? AND user_id = ?", id, idUser)
	} else {
		sql.Where("id = ?", id)
	}
	sql.First(&c)
	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No hay resultados",
		})
	}
	cashTotal := struct {
		CashCordobaTotal float64
		CashDollarTotal  float64
	}{}
	config.DB.Model(models.Sales{}).
		Select("SUM(cash_cordoba - exchange) as CashCordobaTotal, SUM(cash_dollar) as CashDollarTotal").
		Where("cash_register_id = ?", id).
		Scan(&cashTotal)
	c.CashCordobaTotal = fmt.Sprintf("%.2f", cashTotal.CashCordobaTotal)
	c.CashDollarTotal = fmt.Sprintf("%.2f", cashTotal.CashDollarTotal)

	return f.JSON(types.Response{
		Status: true,
		Find:   c,
	})
}
func (c CashRegisterC) Close(f *fiber.Ctx) error {

	userId := f.Locals("userId").(string)
	cashId := f.Locals("cashRegisterId").(string)
	_ = f.BodyParser(&c.Denomination)

	sql := config.DB.
		Model(models.Denomination{}).
		Where("cash_register_id = ?", cashId)
	one, _ := strconv.Atoi(c.Denomination.One)
	five, _ := strconv.Atoi(c.Denomination.Five)
	ten, _ := strconv.Atoi(c.Denomination.Ten)
	twenty, _ := strconv.Atoi(c.Denomination.Twenty)
	fyfty, _ := strconv.Atoi(c.Denomination.Fyfty)
	oneHundred, _ := strconv.Atoi(c.Denomination.OneHundred)
	twoHundred, _ := strconv.Atoi(c.Denomination.TwoHundred)
	fiveHundred, _ := strconv.Atoi(c.Denomination.FiveHundred)
	oneThousand, _ := strconv.Atoi(c.Denomination.OneThousand)
	totalDollar, _ := strconv.ParseFloat(c.Denomination.TotalDollar, 64)
	totalCordoba, _ := strconv.ParseFloat(c.Denomination.TotalCordoba, 64)
	total, _ := strconv.ParseFloat(c.Denomination.Total, 64)

	sql.Create(&models.Denomination{
		ID:             uuid.NewString(),
		CashRegisterID: cashId,
		One:            int64(one),
		Five:           int64(five),
		Ten:            int64(ten),
		Twenty:         int64(twenty),
		Fyfty:          int64(fyfty),
		OneHundred:     int64(oneHundred),
		TwoHundred:     int64(twoHundred),
		FiveHundred:    int64(fiveHundred),
		OneThousand:    int64(oneThousand),
		TotalDollar:    totalDollar,
		TotalCordoba:   totalCordoba,
		Total:          total,
	})

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	var totalSales float64
	config.DB.Model(models.Sales{}).
		Where("cash_register_id = ?", cashId).
		Select("SUM(total)").
		Scan(&totalSales)

	config.DB.
		Model(c.Model).
		Where("user_id = ? AND id = ?", userId, cashId).
		Update("state", 0).
		Update("closed_at", time.Now()).
		Update("total_sales", totalSales)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Caja cerrada",
	})
}
