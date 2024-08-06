package helpers

import (
	"Jugueteria/config"
	"crypto/subtle"

	"github.com/google/uuid"
)

var (
	Csrf csrfH
)

type csrfH struct {
	Exp int64
	Key string
}

func (csrfH) Gen() string {
	tok := uuid.NewString()
	return tok
}

func (csrfH) Verify(a, b []byte) bool {

	return subtle.ConstantTimeCompare(a, b) == 1
}

func (csrfH) Delete(token string) bool {
	sql := `
	    DELETE FROM csrf WHERE key = ?`
	_, err := config.Slite.Exec(sql, token)
	return err != nil
}

func (csrfH) Save(tok string, exp int64) bool {
	sql := `
		INSERT INTO csrf (key,exp) VALUES (?,?)`
	_, err := config.Slite.Exec(sql, tok, exp)
	return err != nil
}

func (tt csrfH) Get(tok string) (int64, string) {
	sql := `
        SELECT exp,key FROM csrf WHERE key = ?`

	_ = config.Slite.QueryRow(sql, tok).Scan(&tt.Exp, &tt.Key)

	return tt.Exp, tt.Key
}
