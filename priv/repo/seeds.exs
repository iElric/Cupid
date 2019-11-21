# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cupid.Repo.insert!(%Cupid.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Cupid.Repo
alias Cupid.Users.User

pw = Argon2.hash_pwd_salt("password1234")

Repo.insert!(%User{name: "Alice", email: "alice@cupid.com", gender: "Female", password_hash: pw})
Repo.insert!(%User{name: "Bob", email: "bob@cupid.com", gender: "Male", password_hash: pw})
Repo.insert!(%User{name: "Tom", email: "tom@cupid.com", gender: "Male", password_hash: pw})
Repo.insert!(%User{name: "Jerry", email: "jerry@cupid.com", gender: "Male", password_hash: pw})