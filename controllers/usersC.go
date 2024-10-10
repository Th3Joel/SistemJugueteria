package controllers

import (
	"Jugueteria/config"
	"Jugueteria/helpers"
	"Jugueteria/models"
	"Jugueteria/types"
	"math"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type UserC struct {
	//Data
	ID       string `json:"id"`
	Name     string `json:"Name"`
	Role     string `json:"Role"`
	Picture  string `json:"Picture,omitempty"`
	Password string `json:"Password,omitempty"`
	Email    string `json:"Email,omitempty"`
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
		Select("id, name, role, picture, email")

	idCurrentUser := c.Locals("userId").(string)
	if q.Search == "" {
		db.Where("id != ?", idCurrentUser).Find(&user.Array)
	} else {
		search := "%" + q.Search + "%"
		db.Where(`
				id != ?
				AND
				(
				LOWER(name) LIKE LOWER(?)
				OR
				Lower(email) LIKE LOWER(?)
				OR
				LOWER(role) LIKE LOWER(?)
				)
			`, idCurrentUser, search, search, search).
			Find(&user.Array)
	}

	config.DB.Model(user.Model).Select("COUNT(id) AS count").Where("id != ?", idCurrentUser).Count(&count)

	data := make([]interface{}, len(user.Array))
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

	fileH := helpers.FilesH{Path: "uploads"}
	file, _ := c.FormFile("file0")
	if file != nil {
		parts := strings.Split(file.Filename, ".")
		filename := user.Email + "." + parts[1]
		err := fileH.SaveFile(filename, file)
		if !err {
			return c.JSON(types.Response{
				Status: false,
				Msj:    "Error al guardar el archivo",
			})
		}
		user.Picture = filename
	}

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

	//Guardar imagen
	fileH := helpers.FilesH{Path: "uploads"}
	file, _ := c.FormFile("file0")
	if file != nil {
		parts := strings.Split(file.Filename, ".")
		filename := user.Email + "." + parts[1]
		err := fileH.SaveFile(filename, file)
		if !err {
			return c.JSON(types.Response{
				Status: false,
				Msj:    "Error al guardar el archivo",
			})
		}
		user.Picture = filename
	}

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

	//Guardar imagen
	fileH := helpers.FilesH{Path: "uploads"}
	file, _ := c.FormFile("file0")
	if file != nil {
		parts := strings.Split(file.Filename, ".")
		filename := user.Email + "." + parts[1]
		err := fileH.SaveFile(filename, file)
		if !err {
			return c.JSON(types.Response{
				Status: false,
				Msj:    "Error al guardar el archivo",
			})
		}
		user.Picture = filename
	}

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
	idUserCurrent := c.Locals("userId").(string)

	if id == idUserCurrent {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "No puedes eliminar a ti mismo",
		})
	}

	sql := db.
		Where("id = ?", id).
		Delete(user.Model)
	if sql.RowsAffected == 0 {
		return c.JSON(types.Response{
			Status: false,
			Msj:    "Usuario no encontrado",
		})
	}

	return c.JSON(types.Response{
		Status: true,
		Msj:    "Usuario eliminado",
	})
}

func (u UserC) GetPicture(f *fiber.Ctx) error {
	email := f.Params("email")
	config.DB.Model(u.Model).Select("picture", "email").Where("email = ?", email).First(&u)

	filesH := helpers.FilesH{Path: "uploads"}
	picture, err := filesH.GetFile(u.Picture)
	if !err || u.Email == "" {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Imagen no encontrado",
		})
	}
	parts := strings.Split(u.Picture, ".")
	if parts[2] == "svg" {
		parts[2] = "svg+xml"
	}
	f.Set("Content-type", "image/"+parts[2])
	return f.Send(picture)
}

func (UserC) trim(u *UserC) {
	u.Name = strings.TrimSpace(u.Name)
	u.Email = strings.TrimSpace(u.Email)
	u.Role = strings.TrimSpace(u.Role)
	u.Picture = strings.TrimSpace(u.Picture)
}
