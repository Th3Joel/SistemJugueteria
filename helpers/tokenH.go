package helpers

import (
	"encoding/json"
	"fmt"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type TokenH struct{}

var secret []byte = []byte("ksnbkajgrkyg7a874ylha")

func (TokenH) Gen(t jwt.Token) string {
	key, _ := jwk.FromRaw(secret)
	key.Set(jwk.AlgorithmKey, jwa.HS256)
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
	t, err := jwt.Parse([]byte(token), jwt.WithKey(jwa.HS256, key))
	//Para imprimir en json
	jsonClaims, _ := json.Marshal(t)
	fmt.Println(string(jsonClaims))

	if err != nil {
		return false
	} else {
		return true
	}
}
