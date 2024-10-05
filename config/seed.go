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

	db.Save(&user)

	company := models.Company{
		ID:          "1",
		Name:        "Jugueteria",
		PriceDollar: 36.80,
	}

	db.Save(&company)

	pettyCash := models.PettyCash{
		ID:             1,
		InitialBalance: 1000,
		Balance:        1000,
		Limit:          500,
	}
	db.Save(&pettyCash)

	if db.Error != nil {
		fmt.Println("No se pudo ejecutar el seeder")
	}
	fmt.Println("Seeder ejecutado correctamente")
}
