package config

import (
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
	dsn := "VwgHAVyMup7XfY6.root:D21sfVrtNmTuZPgy@tcp(gateway01.us-east-1.prod.aws.tidbcloud.com:4000)/jugueteriav2?parseTime=true&tls=true"
	//dsn := "joel:jo12el34@tcp(localhost:3306)/jugueteria?parseTime=true"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{TranslateError: true, SkipDefaultTransaction: true})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos. \n")
	}
	log.Println("Conectado a la base de datos")
	// db.AutoMigrate(models.Company{})
	// db.AutoMigrate(models.Token{})
	// db.AutoMigrate(models.Users{})
	// db.AutoMigrate(models.Costumers{})
	// db.AutoMigrate(models.Suppliers{})
	// db.AutoMigrate(models.PriceCategories{})
	// db.AutoMigrate(models.Articles{})
	// db.AutoMigrate(models.Categories{})
	// db.AutoMigrate(models.Boxes{})
	// db.AutoMigrate(models.Sales{})
	// db.AutoMigrate(models.Purchases{})
	// db.AutoMigrate(models.DetailSale{})
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
