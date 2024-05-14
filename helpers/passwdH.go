package helpers

import "golang.org/x/crypto/bcrypt"

type PasswdH struct{}

func (PasswdH) Hash(passwd string) string {

	hash, _ := bcrypt.GenerateFromPassword([]byte(passwd), 10)

	return string(hash)
}

func (PasswdH) Verify(passwd, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(passwd))
	return err == nil
}
