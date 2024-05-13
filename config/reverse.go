package config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func GetStruct() {
	g := gen.NewGenerator(gen.Config{
		OutPath:      "./query",
		ModelPkgPath: "./models",
	})

	gormdb, _ := gorm.Open(mysql.Open("joel:1234@tcp(localhost)/sisventa?parseTime=true"))
	g.UseDB(gormdb)

	g.ApplyBasic(
		g.GenerateAllTable()...,
	)

	g.Execute()
}
