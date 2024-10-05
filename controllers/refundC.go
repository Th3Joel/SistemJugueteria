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

type RefundC struct {
	ID          string `json:"-"`
	Amount      string `json:"Amount"`
	Observation string `json:"Observation"`
	CreatedAt   string `json:"date"`

	Array []RefundC     `json:"-" gorm:"-"`
	Model models.Refund `json:"-" gorm:"-"`
}

func (r RefundC) All(f *fiber.Ctx) error {
	db := config.DB.Model(r.Model)
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
		db.Find(&r.Array)
	} else {
		que := "%" + q.Search + "%"
		db.Where(`
			LOWER(observation) LIKE LOWER(?) OR
			LOWER(amount) LIKE LOWER(?) OR 
			LOWER (created_at) LIKE LOWER(?)
		`, que, que, que).
			Find(&r.Array)
	}
	db.Count(&count)
	data := make([]interface{}, count)
	for i, v := range r.Array {
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

func (r RefundC) Create(f *fiber.Ctx) error {
	_ = f.BodyParser(&r)
	db := config.DB.Model(r.Model)
	amount, _ := strconv.ParseFloat(r.Amount, 64)

	db.Create(&models.Refund{
		ID:          uuid.NewString(),
		PettyCashID: 1,
		Amount:      amount,
		Observation: r.Observation,
	})

	if db.RowsAffected == 0 {
		return f.Status(400).JSON(types.Response{
			Status: false,
			Msj:    "No se ha actualizado el reembolso",
		})
	}

	pettyCash := models.PettyCash{}
	sql := config.DB.First(&pettyCash, 1)
	amo := pettyCash.Balance + amount
	if amo > pettyCash.InitialBalance {
		amo = pettyCash.InitialBalance
	}
	sql.Update("balance", amo)

	return f.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Reembolso Creado",
	})
}
