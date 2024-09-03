package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"fmt"
	"math"
	"strings"

	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CostumerC struct {
	//Data
	ID    string `json:"id"`
	Name  string `json:"Name"`
	Phone string `json:"Phone"`
	//Settings
	Model models.Costumers `gorm:"-" json:"-"`
	Array []CostumerC      `gorm:"-" json:"-"`
	Prue  *gorm.DB         `gorm:"-" json:"-"`
}

func (costumer CostumerC) All(f *fiber.Ctx) error {
	db := config.DB.Model(costumer.Model)
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	var count int64
	var q types.ParamsTable
	_ = f.QueryParser(&q)
	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	mo := db.
		Offset(skip).
		Limit(take)
	if q.Search == "" {
		mo.Find(&costumer.Array)
	} else {
		mo.
			Where("LOWER(name) LIKE LOWER(?)", "%"+q.Search+"%").
			Find(&costumer.Array)
	}
	db.Count(&count)
	//Rellena la vista
	//var data []CostumerC
	//data = []CostumerC{}
	//for _, costumer := range costumers {
	//data = append(data, CostumerC{
	//ID:      costumer.ID,
	//Name:    costumer.Name,
	//Email:   costumer.Email,
	//Address: costumer.Address,
	//Phone:   costumer.Phone,
	//})
	//}

	//por que data del type ALll solo acepta un slice de interface{}
	//Esto ayuda a que el slice sea de tipo CostumerC
	data := make([]interface{}, count)
	for i, v := range costumer.Array {
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

func (costumer CostumerC) AllSelect(f *fiber.Ctx) error {
	db := config.DB.Model(costumer.Model)
	db.Find(&costumer.Array)

	type P struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	}

	custom := []P{}
	for _, v := range costumer.Array {
		custom = append(custom, P{
			ID:   v.ID,
			Name: v.Name,
		})
	}
	return f.JSON(custom)
}

func (costumer CostumerC) ShowId(f *fiber.Ctx) error {
	db := config.DB.Model(costumer.Model)
	id := f.Params("id")
	sql := db.
		Where("id = ?", id).
		Select("id", "name", "phone").
		First(&costumer)

	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Cliente no encontrado",
		})
	}
	fmt.Println(costumer)

	return f.Status(200).JSON(types.Response{
		Status: true,
		Find:   costumer,
	})
}

func (costumer CostumerC) Save(f *fiber.Ctx) error {
	db := config.DB
	//Pasar el body a la estructura
	_ = f.BodyParser(&costumer)
	costumer.trim(&costumer)

	costumer.ID = uuid.NewString()

	sql := db.
		Create(&models.Costumers{
			ID:    costumer.ID,
			Name:  costumer.Name,
			Phone: costumer.Phone,
		})
	if sql.RowsAffected == 0 {
		return f.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}

	return f.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Cliente creado",
	})
}

func (costumer CostumerC) UpdateId(f *fiber.Ctx) error {
	db := config.DB.Model(costumer.Model)

	id := f.Params("id")
	_ = f.BodyParser(&costumer)
	costumer.trim(&costumer)
	db.
		Where("id = ?", id).
		Select("name", "phone").
		Updates(costumer)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Cliente actualizado correctamente",
	})
}

func (costumer CostumerC) Delete(f *fiber.Ctx) error {
	db := config.DB

	id := f.Params("id")
	sql := db.
		Where("id = ?", id).
		Delete(costumer.Model)

	if sql.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Cliente no encontrado",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Cliente eliminado",
	})
}

func (CostumerC) trim(u *CostumerC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Phone = strings.TrimSpace(u.Phone)
}
