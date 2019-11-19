defmodule Cupid.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :like_from, references(:users, on_delete: :restrict), null: false
      add :like_to, references(:users, on_delete: :restrict), null: false

      timestamps()
    end

    create index(:likes, [:like_from])
    create index(:likes, [:like_to])
  end
end
