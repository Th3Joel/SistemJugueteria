package config

import (
	"database/sql"
	"log"
	"os"

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
	//dsn := "joel:jo12el34@tcp(127.0.0.1:3306)/jugueteria?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{TranslateError: true, SkipDefaultTransaction: true})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos. \n")
	}

	log.Println("Conectado a la base de datos")
	// db.AutoMigrate(models.Company{})
	// db.AutoMigrate(models.Users{})
	// db.AutoMigrate(models.Costumers{})
	// db.AutoMigrate(models.Suppliers{})
	// db.AutoMigrate(models.PriceCategories{})
	// db.AutoMigrate(models.Articles{})
	// db.AutoMigrate(models.Categories{})
	// db.AutoMigrate(models.Boxes{})
	// db.AutoMigrate(models.Purchases{})
	// db.AutoMigrate(models.DetailPurchase{})
	// db.AutoMigrate(models.Sales{})
	// db.AutoMigrate(models.DetailSale{})
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		Seed(db)
	}
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
    );
	
	CREATE TABLE IF NOT EXISTS token (
		ID VARCHAR(100) NOT NULL PRIMARY KEY,
		UserID VARCHAR(100) NOT NULL,
		Token VARCHAR(255) NOT NULL,
		IP VARCHAR(100),
        CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = d.Exec(createTableSQL)
	if err != nil {
		log.Fatalf("Error al crear la tabla csrf: %s", err)
	}
	Slite = d
}
