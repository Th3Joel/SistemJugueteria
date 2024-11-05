package controllers

import (
	"Jugueteria/helpers"
	"Jugueteria/types"
	"fmt"
	"os"
	"os/exec"
	"time"

	"github.com/gofiber/fiber/v2"
)

type BackupC struct{}

func (BackupC) GetFiles(f *fiber.Ctx) error {
	dir := "backups"

	entries, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Error al leer la carpeta:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Error",
		})
	}
	files := make([]string, len(entries))
	for i := 0; i <= len(files)-1; i++ {
		files[i] = entries[i].Name()
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   files,
	})
}

func (BackupC) Generate(f *fiber.Ctx) error {

	user := "joel"
	password := "Jo12el34"
	database := "jugueteria"
	outputFile := "backups/" + time.Now().Format("F2006_01_02H15_04_05") + ".sql"

	cmd := exec.Command("mysqldump", "-hdb", "-u"+user, "-p"+password, database)
	//cmd := exec.Command("mysqldump", "-h", "127.0.0.1", "-u"+user, "-p"+password, database)

	// Redirige la salida del comando al archivo de salida
	output, err := os.Create(outputFile)
	if err != nil {
		fmt.Println("Error al crear el archivo:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	defer output.Close()

	cmd.Stdout = output

	// Ejecuta el comando
	if err := cmd.Run(); err != nil {
		fmt.Println("Error al crear elc comando:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Error al ejecutar el comando",
		})
	}

	fmt.Println("Backup realizado con éxito en", outputFile)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Copia de seguridad generada",
	})
}

func (BackupC) Restore(f *fiber.Ctx) error {
	file := f.Params("file")
	user := "joel"
	password := "Jo12el34"
	database := "jugueteria"
	// Crea el comando mysql
	cmd := exec.Command("mysql", "-h", "db", "-u"+user, "-p"+password, database)
	//cmd := exec.Command("mysql", "-h127.0.0.1", "-u"+user, "-p"+password, database)

	// Abre el archivo de entrada
	input, err := os.Open("backups/" + file + ".sql")
	if err != nil {
		fmt.Println("Error al abrir el archivo:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No existe el archivo",
		})
	}
	defer input.Close()

	// Redirige la entrada del comando al archivo de entrada
	cmd.Stdin = input

	// Ejecuta el comando
	if err := cmd.Run(); err != nil {
		fmt.Println("Error al ejecutar mysql:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	return f.JSON(types.Response{
		Status: true,
		Msj:    "Restauración exitosa",
	})
}

func (BackupC) Download(f *fiber.Ctx) error {
	file := f.Params("file")
	path := file + ".sql"

	filesH := helpers.FilesH{Path: "backups"}

	fileData, err := filesH.GetFile(path)
	if !err {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "El archivo no existe",
		})
	}
	f.Set("Content-Disposition", "attachment; filename="+file+".sql")
	f.Set("Content-Type", "application/sql")
	return f.Send(fileData)
}
