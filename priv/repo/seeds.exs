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
alias Cupid.Matches.Match
alias Cupid.Tags.Tag

pw = Argon2.hash_pwd_salt("password1234")

Repo.insert!(%User{name: "Alice", email: "alice@cupid.com", gender: "Female", password_hash: pw})
Repo.insert!(%User{name: "Jenna", email: "jenna@cupid.com", gender: "Female", password_hash: pw})
Repo.insert!(%User{name: "Bob", email: "bob@cupid.com", gender: "Male", password_hash: pw})
Repo.insert!(%User{name: "Tom", email: "tom@cupid.com", gender: "Male", password_hash: pw})
Repo.insert!(%User{name: "Jerry", email: "jerry@cupid.com", gender: "Male", password_hash: pw})

#Repo.insert!(%Match{user1_id: 1, user2_id: 2})
#Repo.insert!(%Match{user1_id: 3, user2_id: 1})

Repo.insert!(%Tag{name: "Sports"})
Repo.insert!(%Tag{name: "Movies"})
Repo.insert!(%Tag{name: "Marval"})
Repo.insert!(%Tag{name: "Game of Thrones"})
Repo.insert!(%Tag{name: "NBA"})
Repo.insert!(%Match{user1_id: 1, user2_id: 2})
Repo.insert!(%Match{user1_id: 1, user2_id: 3})
Repo.insert!(%Match{user1_id: 1, user2_id: 4})
