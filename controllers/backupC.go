package controllers

import (
	"Jugueteria/helpers"
	"Jugueteria/types"
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type BackupC struct{}

func (BackupC) FileMysql(user, password, host string) (string, func()) {
	timestamp := time.Now().UnixNano()
	filePath := fmt.Sprintf("%d.cnf", timestamp)
	// Abrir o crear el archivo con permisos 600
	// os.O_CREATE crea el archivo si no existe
	// os.O_WRONLY abre el archivo para escritura
	// os.O_TRUNC trunca el archivo si ya existe, osea, si existe, se sobreescribe
	file, err := os.OpenFile(filePath, os.O_CREATE|os.O_WRONLY, 0600)
	if err != nil {
		log.Fatalln("Error al crear el archivo:", err)
	}
	defer file.Close()
	// Escribir algo en el archivo
	_, err = file.WriteString("[client]\n" + "user=" + user + "\n" + "password=" + password + "\n" + "host=" + host + "\n")
	if err != nil {
		log.Fatalln("Error al escribir en el archivo:", err)
	}
	return filePath, func() {
		os.Remove(filePath)
	}

}
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

func (b BackupC) Generate(f *fiber.Ctx) error {

	user := "joel"
	password := "Jo12el34"
	database := "jugueteria"
	host := "db"
	outputFile := "backups/" + time.Now().Format("Fecha2006_01_02Hora15_04_05") + ".sql"
	cnf, rm := b.FileMysql(user, password, host) //Para mayor seguridad
	// Crea el archivo de salida
	output, err := os.Create(outputFile)
	if err != nil {
		fmt.Println("Error al crear el archivo:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error",
		})
	}
	defer output.Close()

	//cmd := exec.Command("mysqldump", "-hdb", "-u"+user, "-p"+password, database)
	cmd := exec.Command("mysqldump", "--defaults-file="+cnf, database)

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	// Ejecuta el comando
	err2 := cmd.Run()
	rm() //Elimina el archivo my.cnf
	if err2 != nil {
		fmt.Println("Error al ejecutar comando:", stderr.String())
		os.Remove(outputFile)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Error al ejecutar el comando",
		})
	}
	os.WriteFile(outputFile, stdout.Bytes(), 0600)
	fmt.Println("Backup realizado con éxito en ", outputFile)

	return f.JSON(types.Response{
		Status: true,
		Msj:    "Copia de seguridad generada",
	})
}

func (b BackupC) Restore(f *fiber.Ctx, upload bool) error {
	file := ""
	filesH := helpers.FilesH{Path: "backups"}

	if upload {
		fileNameUploaded := fmt.Sprintf("%d.sql", time.Now().UnixMilli())

		sqlForm, err := f.FormFile("file0")
		if err != nil {
			return f.JSON(types.Response{
				Status: false,
				Msj:    "Archivo requerido",
			})
		}
		ext := strings.Split(sqlForm.Filename, ".")
		if ext[len(ext)-1] != "sql" {
			return f.JSON(types.Response{
				Status: false,
				Msj:    "El archivo debe ser de tipo sql",
			})
		}
		filesH.SaveFile(fileNameUploaded, sqlForm)
		file = fileNameUploaded

	} else {
		file = f.Params("file") + ".sql"
	}

	user := "joel"
	password := "Jo12el34"
	database := "jugueteria"
	host := "db"
	cnf, rm := b.FileMysql(user, password, host)
	// Crea el comando mysql
	//cmd := exec.Command("mysql", "-h", "db", "-u"+user, "-p"+password, database)
	cmd := exec.Command("mysql", "--defaults-file="+cnf, database)
	// Abre el archivo de entrada
	input, err := os.Open("backups/" + file)
	if err != nil {
		fmt.Println("Error al abrir el archivo:", err)
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No existe el archivo",
		})
	}
	defer input.Close()
	var stderr bytes.Buffer
	cmd.Stderr = &stderr
	// Redirige la entrada del comando al archivo de entrada
	cmd.Stdin = input

	// Ejecuta el comando
	err1 := cmd.Run()
	rm() //Elimina el archivo my.cnf
	if upload {
		os.Remove("backups/" + file)
	}
	if err1 != nil {
		fmt.Println("Error al ejecutar mysql:", stderr.String())
		return f.JSON(types.Response{
			Status: false,
			Msj:    "Ha ocurrido un error,revise si el script es válido",
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
