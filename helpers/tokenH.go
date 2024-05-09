package helpers

import (
	"fmt"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

type TokenH struct{}

var secret []byte = []byte("ksnbkajgrkyg7a874ylha")

func (th TokenH) Gen(t jwt.Token) string {
	key, _ := jwk.FromRaw(secret)
	key.Set(jwk.AlgorithmKey, jwa.HS256)
	sign, err := jwt.Sign(t, jwt.WithKey(jwa.HS256, key))
	if err != nil {
		fmt.Printf("failed to sign token: %s\n", err)
	}

	return string(sign)
}
