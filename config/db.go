package config

import (
	"Jugueteria/models"
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB    *gorm.DB
	Slite *sql.DB
)

func ConnectDB() {
	dsn := "VwgHAVyMup7XfY6.root:D21sfVrtNmTuZPgy@tcp(gateway01.us-east-1.prod.aws.tidbcloud.com:4000)/jugueteria?parseTime=true&tls=true"
	//dsn := "joel:1234@tcp(localhost)/sisventa?parseTime=true"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{TranslateError: true})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos. \n")
	}
	db.AutoMigrate(models.User{})
	db.AutoMigrate(models.Cliente{})
	db.AutoMigrate(models.Proveedore{})
	db.AutoMigrate(models.Token{})
	log.Println("Conectado a la base de datos")
	DB = db

	//base de datos utilizada para los tokens csfr
	d, err := sql.Open("sqlite3", "./system.sqlite3")
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos sqlite3. \n")
	}
	createTableSQL := `
    CREATE TABLE IF NOT EXISTS csrf (
        key VARCHAR(64) NOT NULL PRIMARY KEY,
        exp BIGINT NOT NULL DEFAULT(0)
    );`
	_, err = d.Exec(createTableSQL)
	if err != nil {
		log.Fatalf("Error al crear la tabla csrf: %s", err)
	}
	Slite = d
}
