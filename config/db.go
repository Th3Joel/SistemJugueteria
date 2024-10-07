package config

import (
	"Jugueteria/models"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	_ "modernc.org/sqlite"
	//"github.com/mattn/go-sqlite3"
)

var (
	DB    *gorm.DB
	Slite *sql.DB
)

func ConnectDB() {
	//dsn := "VwgHAVyMup7XfY6.root:D21sfVrtNmTuZPgy@tcp(gateway01.us-east-1.prod.aws.tidbcloud.com:4000)/jugueteria?parseTime=true&tls=true"
	dsn := "joel:Jo12el34//@tcp(127.0.0.1:3306)/jugueteria?charset=utf8mb4&parseTime=true&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		TranslateError:         true,
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos. \n")
	}

	log.Println("Conectado a la base de datos")
	for _, v := range os.Args {
		if v == "migrate" {

			_ = db.AutoMigrate(models.Company{})
			_ = db.AutoMigrate(models.Users{})
			_ = db.AutoMigrate(models.Costumers{})
			_ = db.AutoMigrate(models.Suppliers{})
			_ = db.AutoMigrate(models.Category{})
			_ = db.AutoMigrate(models.Articles{})
			_ = db.AutoMigrate(models.ArticlesBox{})
			_ = db.AutoMigrate(models.Purchases{})
			_ = db.AutoMigrate(models.DetailPurchase{})
			_ = db.AutoMigrate(models.Sales{})
			_ = db.AutoMigrate(models.DetailSale{})
			_ = db.AutoMigrate(models.CashRegister{})
			_ = db.AutoMigrate(models.Denomination{})
			_ = db.AutoMigrate(models.PettyCash{})
			_ = db.AutoMigrate(models.Refund{})
			_ = db.AutoMigrate(models.Expenses{})
		}
		if v == "seed" {
			Seed(db)
		}
	}
	DB = db

	//base de datos utilizada para los tokens y token csfr
	d, err := sql.Open("sqlite", "./system.db")
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos sqlite3. \n")
	}
	//d.SetMaxOpenConns(1)

	createTableSQL := `
	CREATE TABLE IF NOT EXISTS token (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		user_id VARCHAR(100) NOT NULL,
		key VARCHAR(255) NOT NULL,
		exp BIGINT,
		ip VARCHAR(100),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = d.Exec(createTableSQL)

	if err != nil {
		log.Fatalf("Error al crear la tabla csrf: %s", err)
	}
	Slite = d
}

func CleanSqliteToken() {

	sql := "DELETE FROM token WHERE exp < ?;"
	for {
		time.Sleep(time.Minute * 30)
		_, err := Slite.Exec(sql, time.Now().Unix())
		if err != nil {
			log.Println("Error al limpiar la tabla token: ", err)
		}
		fmt.Println("Tokens expirados han sido limpiados")
	}
}
