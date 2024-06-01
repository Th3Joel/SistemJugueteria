package config

import (
	"Jugueteria/models"
	"fmt"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Seed(db *gorm.DB) {
	hash, _ := bcrypt.GenerateFromPassword([]byte("1234"), 10)
	user := models.Users{
		ID:       uuid.New().String(),
		Name:     "Joel Urbina",
		Email:    "joel@gmail.com",
		Password: string(hash),
		Role:     "admin",
		Picture:  "",
	}

	err := db.Save(&user)

	if err.Error != nil {
		fmt.Println("No se pudo ejecutar el seeder")
	}
	fmt.Println("Seeder ejecutado correctamente")
}
