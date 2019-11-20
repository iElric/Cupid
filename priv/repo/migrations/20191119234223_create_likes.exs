defmodule Cupid.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :like_from_id, references(:users, on_delete: :restrict), null: false
      add :like_to_id, references(:users, on_delete: :restrict), null: false

      timestamps()
    end

    create index(:likes, [:like_from_id])
    create index(:likes, [:like_to_id])
    create unique_index(:likes, [:like_from_id, :like_to_id])
  end
end
