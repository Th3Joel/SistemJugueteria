package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserC struct {
	ID      string `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Role    string `json:"role,omitempty"`
	Picture string `json:"picture,omitempty"`
	Email   string `json:"email,omitempty"`
}

type Response struct {
	Status bool   `json:"status"`
	Find   *UserC `json:"find,omitempty"`
	Msj    string `json:"msj,omitempty"`
	All    *all   `json:"all,omitempty"`
}
type all struct {
	Data     []UserC `json:"data"`
	Count    int     `json:"count"`
	Pages    int     `json:"pages"`
	Page     int     `json:"page"`
	PageSize int
}

func (u UserC) All(c *fiber.Ctx) error {
	type QueriesParams struct {
		Page     int    `query:"page"`
		PageSize int    `query:"pageSize"`
		Search   string `query:"search"`
	}
	var users []models.User
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	q := new(QueriesParams)
	c.QueryParser(q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	config.DB.Offset(skip).Limit(take).Find(&users)
	count := len(users)

	//Rellena la vista
	data := []UserC{}
	for _, user := range users {
		data = append(data, UserC{
			ID:      user.ID,
			Email:   user.Email,
			Name:    user.Name,
			Role:    user.Role,
			Picture: user.Picture,
		})
	}

	return c.JSON(Response{
		Status: true,
		All: &all{
			Data:     data,
			Count:    count,
			Pages:    (count / q.PageSize) + 1,
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})
}

func (u *UserC) ShowId(c *fiber.Ctx) error {
	id := c.Params("id")

	re := config.DB.Model(models.User{ID: id}).Select("id", "email", "name", "role", "picture").First(&u)
	if re.RowsAffected == 0 {
		return c.JSON(Response{
			Status: false,
			Msj:    "Usuario no encontrado",
		})
	}
	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.JSON(Response{
		Status: true,
		Find:   u,
	})
}

func (u *UserC) Show(c *fiber.Ctx) error {
	id := c.Locals("userId").(string)
	config.DB.Model(models.User{ID: id}).Select("id", "email", "name", "role", "picture").First(&u)

	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.Status(200).JSON(Response{
		Status: true,
		Find:   u,
	})
}

func (u UserC) Save(c *fiber.Ctx) error {
	passwdH := new(helpers.PasswdH)
	user := new(models.User)

	//Pasar el body a la estructura
	c.BodyParser(user)
	antePass := user.Password

	user.ID = uuid.NewString()
	user.Password = passwdH.Hash(antePass)
	user.UpdateAt = time.Now()

	db := config.DB.Create(&user)

	if errors.Is(db.Error, gorm.ErrDuplicatedKey) {
		return c.JSON(Response{
			Status: false,
			Msj:    "El email ya existe",
		})
	}

	return c.JSON(Response{
		Status: true,
		Msj:    "Usuario creado",
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (u UserC) Update(c *fiber.Ctx) error {

	id := c.Params("id")

	userFound := &models.User{ID: id}
	c.BodyParser(&u)

	sql := config.DB.First(userFound)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Usuario no encontrado",
		})
	}

	config.DB.Model(userFound).Updates(u)

	return c.JSON(u)
}

func (ac UserC) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	user := models.User{ID: id}
	sql := config.DB.Delete(user)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Usuario no encontrado",
		})
	}

	return c.JSON(fiber.Map{
		"status": true,
		"msj":    "Usuario eliminado",
	})
}
