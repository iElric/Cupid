defmodule Cupid.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :name, :string, null: false, unique: true
      add :gender, :string, null: false
      add :password_hash, :string, null: false
      add :desc, :text, default: "No description"

      timestamps()
    end

  end
end
