package helpers

import (
	"Jugueteria/config"
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"time"
)

type TokenH struct {
	UserId string
	Key    string
	Exp    int64
	Ip     string
}

// var secret []byte = []byte("ksnbkajgrkyg7a874ylha")

// func (TokenH) Gen(t jwt.Token) string {
// 	key, _ := jwk.FromRaw(secret)
// 	_ = key.Set(jwk.AlgorithmKey, jwa.HS256)
// 	sign, err := jwt.Sign(t, jwt.WithKey(jwa.HS256, key))
// 	if err != nil {
// 		fmt.Printf("failed to sign token: %s\n", err)
// 	}

// 	return string(sign)
// }

func (TokenH) Gen() (string, bool) {
	tokenBytes := make([]byte, 64)
	_, err := rand.Read(tokenBytes)

	return base64.RawURLEncoding.EncodeToString(tokenBytes), err != nil
}

// func (TokenH) Verify(token string) bool {
// 	// Cargar la clave secreta
// 	key, _ := jwk.FromRaw(secret)

// 	// Verifica si el token es válido
// 	_, err := jwt.Parse([]byte(token), jwt.WithKey(jwa.HS256, key))
// 	//Para imprimir en json
// 	//jsonClaims, _ := json.Marshal(t)
// 	//fmt.Println(string(jsonClaims))

// 	if err != nil {
// 		return false
// 	} else {
// 		return true
// 	}
// }

func (TokenH) Compare(a, b string) bool {
	return subtle.ConstantTimeCompare([]byte(a), []byte(b)) == 1
}

func (TokenH) Save(tok, userID string, exp time.Duration, ip ...string) bool {

	sql := `
	    INSERT INTO token (user_id,key,exp,ip) VALUES (?,?,?,?)`
	_, err := config.Slite.Exec(sql, userID, tok, time.Now().Add(exp).Unix(), ip[0])
	return err != nil
}

func (TokenH) Remove(tok string) bool {
	sql := `
        DELETE FROM token WHERE key = ?`
	_, err := config.Slite.Exec(sql, tok)
	return err != nil
}

func (t TokenH) Get(tok string) TokenH {
	sql := `
        SELECT key,user_id,exp,ip FROM token WHERE key = ?`

	config.Slite.QueryRow(sql, tok).Scan(&t.Key, &t.UserId, &t.Exp, &t.Ip)

	return t
}
