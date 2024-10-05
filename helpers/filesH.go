package helpers

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
)

type FilesH struct {
	Path string
}

/*
Crear carpeta si no existe
*/
func (FilesH) CreateFolder(name string) bool {
	// Verifica si la carpeta ya existe
	if _, err := os.Stat(name); os.IsNotExist(err) {
		// Si no existe, la crea
		err := os.Mkdir(name, 0755) // 0755 son los permisos
		if err != nil {
			fmt.Println("Error al crear la carpeta:", err)
			return false
		}
		fmt.Println("Carpeta creada:", name)
		return true
	} else {
		fmt.Println("La carpeta ya existe:", name)
	}
	return true
}

func (f FilesH) GetFile(fileName string) ([]byte, bool) {

	fileData, err := os.ReadFile(f.Path + "/" + fileName)
	if err != nil {
		fmt.Println("Error al leer el archivo: "+fileName, err)
		return nil, false
	}
	return fileData, true
}

func (f FilesH) SaveFile(fileName string, file *multipart.FileHeader) bool {
	path := f.Path + "/" + fileName
	// Abre el archivo recibido
	src, err := file.Open()
	if err != nil {
		fmt.Println("Error al abrir el archivo:", err)
		return false
	}
	defer src.Close()

	// Crea un nuevo archivo en el sistema de archivos
	dst, err := os.Create(path)
	if err != nil {
		fmt.Println("Error al crear el archivo:", err)
		return false
	}
	defer dst.Close()

	// Copia el contenido del archivo subido al nuevo archivo
	if _, err := io.Copy(dst, src); err != nil {
		fmt.Println("Error al copiar el archivo:", err)
		return false
	}
	return true
}
