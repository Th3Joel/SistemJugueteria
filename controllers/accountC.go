package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AccountC struct{}

func (ac AccountC) Show(c *fiber.Ctx) error {
	var account []models.Prueba
	//Se escribe & para hacer una referencia al espacio de memoria
	//en resumen permite modificar el original y no crear una copia
	config.DB.Find(&account)
	return c.JSON(account)
}

func (ac AccountC) ShowId(c *fiber.Ctx) error {
	id := c.Params("id")
	account := models.Prueba{ID: id}

	re := config.DB.First(&account)
	if re.RowsAffected == 0 {
		return c.JSON(fiber.Map{
			"status": false,
			"error":  "No encontrado",
		})
	}
	return c.JSON(account)
}

func (ac AccountC) Save(c *fiber.Ctx) error {
	passwdH := new(helpers.PasswdH)
	account := new(models.Prueba)

	//Pasar el body a la estructura
	c.BodyParser(&account)

	antePass := account.Password

	account.ID = uuid.NewString()
	account.Password = passwdH.Hash(antePass)

	res := config.DB.Create(&account)

	if errors.Is(res.Error, gorm.ErrDuplicatedKey) {
		return c.JSON(fiber.Map{
			"status": false,
			"msj":    "Email esta duplicado",
		})
	}

	return c.JSON(fiber.Map{
		"status": true,
		"msj":    "Usuario guardado",
		"data":   account,
	})
}

// El * es para tipos y autocompletado,
// y el & es para poder modificar el espacio
//
//	de memoria o el datos del espacio de memoria
func (ac AccountC) Update(c *fiber.Ctx) error {
	id := c.Params("id")
	user := models.Prueba{ID: id}
	config.DB.First(&user)

	updateData := new(models.Prueba)

	c.BodyParser(updateData)

	user.Email = updateData.Email
	user.Password = updateData.Password

	res := config.DB.Save(&user)
	if res.Error != nil {
		return c.JSON(res.Error)
	}
	return c.JSON(user)
}

func (ac AccountC) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	user := models.Prueba{ID: id}
	re := config.DB.Delete(user)
	if re.RowsAffected == 0 {
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
