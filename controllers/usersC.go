package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"Jugueteria/types"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"math"
	"strings"
)

type UserC struct {
	//Data
	ID       string `json:"id"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Picture  string `json:"picture,omitempty"`
	Password string `json:"password,omitempty"`
	Email    string `json:"email,omitempty"`
	//Settings
	Model models.Users `gorm:"-" json:"-"`
	Array []UserC      `gorm:"-" json:"-"`
}

func (user UserC) All(c *fiber.Ctx) error {
	db := config.DB.Model(user.Model)
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	var count int64
	var q types.ParamsTable
	_ = c.QueryParser(&q)

	skip := (q.Page - 1) * q.PageSize
	take := q.PageSize
	db.
		Offset(skip).
		Limit(take).
		Select("id, name, role, picture, email").
		Where("id != ?", c.Locals("userId").(string)).
		Find(&user.Array).
		Count(&count)

	data := make([]interface{}, count)
	for i, v := range user.Array {
		data[i] = v
	}
	return c.Status(200).JSON(types.Response{
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

func (user UserC) ShowId(c *fiber.Ctx) error {
	db := config.DB.Model(user.Model)

	id := c.Params("id")

	sql := db.
		Select("id", "email", "name", "role", "picture").
		Where("id = ?", id).
		First(&user)

	if sql.RowsAffected == 0 {
		return c.Status(200).JSON(types.Response{
			Status: false,
			Msj:    "Usuario no encontrado",
		})
	}

	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.Status(200).JSON(types.Response{
		Status: true,
		Find:   user,
	})
}

func (user UserC) Show(c *fiber.Ctx) error {
	db := config.DB.Model(user.Model)

	id := c.Locals("userId").(string)

	db.
		Select("id", "email", "name", "role", "picture").
		Where("id = ?", id).
		First(&user)

	//us := c.Locals("user").(map[string]interface{})["id"]
	//us["id"].(string)
	return c.Status(200).JSON(types.Response{
		Status: true,
		Find:   user,
	})
}

func (user UserC) Save(c *fiber.Ctx) error {
	db := config.DB

	passwdH := helpers.PasswdH{}
	//Pasar el body a la estructura
	_ = c.BodyParser(&user)

	user.trim(&user)

	antePass := user.Password

	user.ID = uuid.NewString()
	user.Password = passwdH.Hash(antePass)

	db.Create(&models.Users{
		ID:       user.ID,
		Email:    user.Email,
		Name:     user.Name,
		Role:     user.Role,
		Picture:  user.Picture,
		Password: user.Password,
		//UpdateAt: time.Now(),
	})

	// if errors.Is(db.Error, gorm.ErrDuplicatedKey) {
	// 	return c.JSON(Response{
	// 		Status: false,
	// 		Msj:    "El email ya existe",
	// 	})
	// }

	return c.Status(200).JSON(types.Response{
		Status: true,
		Msj:    "Usuario creado",
	})
}

// UpdateId El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el dato del espacio de memoria
func (user UserC) UpdateId(c *fiber.Ctx) error {
	db := config.DB.Model(user.Model)

	passwdH := helpers.PasswdH{}
	idCurrent := c.Locals("userId").(string)
	id := c.Params("id")

	_ = c.BodyParser(&user)
	user.trim(&user) //Eliminar los espacios en blanco
	if user.Password != "" {
		user.Password = passwdH.Hash(user.Password)
	}
	if id == idCurrent {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "No puedes editar tu propio usuario",
		})
	}

	db.
		Where("id = ?", id).
		Updates(user)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Usuario actualizado correctamente",
	})
}
func (user UserC) Update(c *fiber.Ctx) error {
	db := config.DB.Model(user.Model)

	passwdH := helpers.PasswdH{}
	id := c.Locals("userId").(string)

	_ = c.BodyParser(&user)
	user.trim(&user) //Eliminar los espacios en blanco
	if user.Password != "" {
		user.Password = passwdH.Hash(user.Password)
	}

	db.
		Where("id = ?", id).
		Updates(user)

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Perfil actualizado",
	})
}

func (user UserC) Delete(c *fiber.Ctx) error {
	db := config.DB

	id := c.Params("id")

	sql := db.
		Where("id = ?", id).
		Delete(&user.Model)
	if sql.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Usuario no encontrado",
		})
	}

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Usuario no eliminado",
	})
}

func (UserC) trim(u *UserC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Role = strings.TrimSpace(u.Role)
	u.Picture = strings.TrimSpace(u.Picture)
}
