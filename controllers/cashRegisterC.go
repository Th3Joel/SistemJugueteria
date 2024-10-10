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
	ID     string `json:"id"`
	UserID string `json:"userID"`
	State  string `json:"state"`

	InitialBalance    string `json:"initialBalance"`
	TotalSales        string `json:"totalSales"`
	TotalExpenses     string `json:"totalExpenses"`
	TotalCordobas     string `json:"totalCordobas"`
	MissingInCordobas string `json:"missingInCordobas"`
	CordobasSurplus   string `json:"cordobasSurplus"`
	TotalDollars      string `json:"totalDollars"`
	MissingInDollars  string `json:"missingInDollars"`
	DollarsSurplus    string `json:"dollarsSurplus"`
	//TotalCashBalance string `json:"totalCashBalance"`

	ClosedAt  string `json:"closedAt"`
	CreatedAt string `json:"createdAt"`

	Denomination Denomination        `json:"denomination,omitempty" gorm:"foreignKey:CashRegisterID"`
	Users        Users               `json:"user" gorm:"foreignKey:UserID"`
	Model        models.CashRegister `json:"-" gorm:"-"`
	Array        []CashRegisterC     `json:"-" gorm:"-"`
	// Sales        []Sales      `json:"sale" gorm:"foreignKey:CashRegisterID"`
	Expenses []Expenses `json:"expenses" gorm:"foreignKey:CashRegisterID"`
	// Denomination Denomination `json:"denomination" gorm:"foreignKey:CashRegisterID"`
}

type Expenses struct {
	ID             string `json:"id"`
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
	ZeroPointFive  string `json:"ZeroPointFive"`
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
	db.Model(c.Model).Select("COUNT(id) AS count").Count(&count)
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

func (c CashRegisterC) Verify(f *fiber.Ctx) error {
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Passed",
	})
}

func (c CashRegisterC) Save(f *fiber.Ctx) error {

	_ = f.BodyParser(&c)
	userId := f.Locals("userId").(string)
	initialBalance, _ := strconv.ParseFloat(c.InitialBalance, 64)
	sql := config.DB.Create(&models.CashRegister{
		ID:             uuid.NewString(),
		UserID:         userId,
		InitialBalance: initialBalance,
		CreatedAt:      time.Now(),
		ClosedAt:       nil,
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
	totals := struct {
		TotalSales   float64
		TotalDollars float64
	}{}
	cashRegisterId := f.Locals("cashRegisterId").(string)
	userId := f.Locals("userId").(string)

	config.DB.
		Model(models.Sales{}).
		Select("SUM(total) as total_sales, SUM(cash_dollar) as total_dollars").
		Where("cash_register_id = ? AND user_id = ?", cashRegisterId, userId).
		Scan(&totals)
	fmt.Println(cashRegisterId)
	db := config.DB.Model(c.Model)
	db.
		Preload("Expenses").
		Preload("Users").
		Where("user_id = ? AND state != 0", f.Locals("userId").(string)).
		First(&c)
	c.TotalSales = fmt.Sprintf("%.2f", totals.TotalSales)
	c.TotalDollars = fmt.Sprintf("%.2f", totals.TotalDollars)
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
		Preload("Expenses").
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

	return f.JSON(types.Response{
		Status: true,
		Find:   c,
	})
}
func (c CashRegisterC) Close(f *fiber.Ctx) error {

	userId := f.Locals("userId").(string)
	cashId := f.Locals("cashRegisterId").(string)
	_ = f.BodyParser(&c)

	sql2 := config.DB.
		Model(c.Model).
		Where("user_id = ? AND id = ?", userId, cashId).
		Updates(types.Json{
			"state":          0,
			"closed_at":      time.Now(),
			"total_expenses": c.TotalExpenses,
			"total_sales":    c.TotalSales,

			"total_cordobas":      c.TotalCordobas,
			"missing_in_cordobas": c.MissingInCordobas,
			"cordobas_surplus":    c.CordobasSurplus,

			"total_dollars":      c.TotalDollars,
			"missing_in_dollars": c.MissingInDollars,
			"dollars_surplus":    c.DollarsSurplus,
		})

	if sql2.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se ha actualizado el caja",
		})
	}

	sql := config.DB.
		Model(models.Denomination{}).
		Where("cash_register_id = ?", cashId)
	zeroPointFive, _ := strconv.ParseFloat(c.Denomination.ZeroPointFive, 64)
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

	sql.Create(&models.Denomination{
		ID:             uuid.NewString(),
		CashRegisterID: cashId,
		ZeroPointFive:  zeroPointFive,
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
	})

	// sql.Create(types.Json{
	// 	"id":               uuid.NewString(),
	// 	"cash_register_id": cashId,
	// 	"ZeroPointFive":    c.Denomination.ZeroPointFive,
	// 	"One":              c.Denomination.One,
	// 	"Five":             c.Denomination.Five,
	// 	"Ten":              c.Denomination.Ten,
	// 	"Twenty":           c.Denomination.Twenty,
	// 	"Fyfty":            c.Denomination.Fyfty,
	// 	"OneHundred":       c.Denomination.OneHundred,
	// 	"TwoHundred":       c.Denomination.TwoHundred,
	// 	"FiveHundred":      c.Denomination.FiveHundred,
	// 	"OneThousand":      c.Denomination.OneThousand,
	// 	"TotalDollar":      c.Denomination.TotalDollar,
	// 	"TotalCordoba":     c.Denomination.TotalCordoba,
	// })

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se guardó las denominaciones",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Caja cerrada",
	})
}
