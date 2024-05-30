package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"fmt"
	"math"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type UserC struct {
	ID       string `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Role     string `json:"role,omitempty"`
	Picture  string `json:"picture,omitempty"`
	Password string `json:"password,omitempty"`
	Email    string `json:"email,omitempty"`
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

func (UserC) All(c *fiber.Ctx) error {
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

	return c.Status(200).JSON(Response{
		Status: true,
		All: &all{
			Data:     data,
			Count:    count,
			Pages:    int(math.Ceil(float64(count) / float64(q.PageSize))),
			Page:     q.Page,
			PageSize: q.PageSize,
		},
	})
}

func (UserC) ShowId(c *fiber.Ctx) error {
	id := c.Params("id")

	useModel := models.User{ID: id}
	sql := config.DB.Select("id", "email", "name", "role", "picture").First(&useModel)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(Response{
			Status: false,
			Msj:    "Usuario no encontrado",
		})
	}

	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.Status(200).JSON(Response{
		Status: true,
		Find: &UserC{
			Email:   useModel.Email,
			Name:    useModel.Name,
			Role:    useModel.Role,
			Picture: useModel.Picture,
		},
	})
}

func (UserC) Show(c *fiber.Ctx) error {
	id := c.Locals("userId").(string)

	useModel := models.User{ID: id}
	config.DB.Select("id", "email", "name", "role", "picture").First(&useModel)
	fmt.Println(id)
	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.Status(200).JSON(Response{
		Status: true,
		Find: &UserC{
			Email:   useModel.Email,
			Name:    useModel.Name,
			Role:    useModel.Role,
			Picture: useModel.Picture,
		},
	})
}

func (u UserC) Save(c *fiber.Ctx) error {
	passwdH := helpers.PasswdH{}
	user := UserC{}

	//Pasar el body a la estructura
	c.BodyParser(&user)
	u.trim(&user)
	antePass := user.Password

	user.ID = uuid.NewString()
	user.Password = passwdH.Hash(antePass)

	config.DB.Create(models.User{
		ID:       user.ID,
		Email:    user.Email,
		Name:     user.Name,
		Role:     user.Role,
		Picture:  user.Picture,
		Password: user.Password,
		UpdateAt: time.Now(),
	})

	// if errors.Is(db.Error, gorm.ErrDuplicatedKey) {
	// 	return c.JSON(Response{
	// 		Status: false,
	// 		Msj:    "El email ya existe",
	// 	})
	// }

	return c.Status(200).JSON(Response{
		Status: true,
		Msj:    "Usuario creado",
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (u UserC) UpdateId(c *fiber.Ctx) error {

	id := c.Params("id")
	userBody := UserC{}

	userFound := models.User{ID: id}
	c.BodyParser(&userBody)
	u.trim(&userBody) //Eliminar los espacios en blanco
	userBody.Password = ""
	sql := config.DB.First(&userFound)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Usuario no encontrado",
		})
	}

	config.DB.Model(userFound).Updates(userBody)

	return c.JSON(Response{
		Status: true,
		Msj:    "Usuario actualizado correctamente",
	})
}
func (u UserC) Update(c *fiber.Ctx) error {

	id := c.Locals("userId").(string)
	userBody := UserC{}

	userFound := models.User{ID: id}
	c.BodyParser(&userBody)
	u.trim(&userBody) //Eliminar los espacios en blanco
	userBody.Password = ""
	sql := config.DB.First(&userFound)
	if sql.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Usuario no encontrado",
		})
	}

	sql2 := config.DB.Model(userFound).Updates(userBody)
	if sql2.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Ha ocurrido un error",
		})
	}

	return c.JSON(Response{
		Status: true,
		Msj:    "Usuario actualizado correctamente",
	})
}

func (UserC) Delete(c *fiber.Ctx) error {
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

func (UserC) trim(u *UserC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Role = strings.TrimSpace(u.Role)
	u.Picture = strings.TrimSpace(u.Picture)
}
