package helpers

import (
	"Jugueteria/config"
	"fmt"

	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type TokenH struct{}

var secret []byte = []byte("ksnbkajgrkyg7a874ylha")

func (TokenH) Gen(t jwt.Token) string {
	key, _ := jwk.FromRaw(secret)
	_ = key.Set(jwk.AlgorithmKey, jwa.HS256)
	sign, err := jwt.Sign(t, jwt.WithKey(jwa.HS256, key))
	if err != nil {
		fmt.Printf("failed to sign token: %s\n", err)
	}

	return string(sign)
}

func (TokenH) Verify(token string) bool {
	// Cargar la clave secreta
	key, _ := jwk.FromRaw(secret)

	// Verifica si el token es válido
	_, err := jwt.Parse([]byte(token), jwt.WithKey(jwa.HS256, key))
	//Para imprimir en json
	//jsonClaims, _ := json.Marshal(t)
	//fmt.Println(string(jsonClaims))

	if err != nil {
		return false
	} else {
		return true
	}
}

func (TokenH) Save(tok, userID string) bool {
	sql := `
        INSERT INTO token (ID,UserID,Token) VALUES (?,?,?)`
	_, err := config.Slite.Exec(sql, uuid.NewString(), userID, tok)
	return err != nil
}

func (TokenH) Remove(tok string) bool {
	sql := `
        DELETE FROM token WHERE Token = ?`
	_, err := config.Slite.Exec(sql, tok)
	return err != nil
}

func (TokenH) Get(tok string) (string, string) {
	sql := `
        SELECT Token,UserID FROM token WHERE Token = ?`
	var token string
	var userID string
	_ = config.Slite.QueryRow(sql, tok).Scan(&token, &userID)

	return token, userID
}
