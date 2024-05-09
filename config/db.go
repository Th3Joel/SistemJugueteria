package config

import (
	"Jugueteria/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func ConnectDB() {

	dsn := "VwgHAVyMup7XfY6.root:D21sfVrtNmTuZPgy@tcp(gateway01.us-east-1.prod.aws.tidbcloud.com:4000)/trabajosya?parseTime=true&tls=true"
	//dsn := "joel:1234@tcp(localhost)/trabajosya?parseTime=true"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{TranslateError: true})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos. \n")
	}
	db.AutoMigrate(models.Prueba{})
	log.Println("Conectado a la base de datos")
	DB = db
}
