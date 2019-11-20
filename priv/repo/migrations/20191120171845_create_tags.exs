defmodule Cupid.Repo.Migrations.CreateTags do
  use Ecto.Migration

  def change do
    create table(:tags) do
      add :name, :string, null: false, unique: true

      timestamps()
    end

  end
end
