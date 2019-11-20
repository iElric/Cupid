defmodule Cupid.Repo.Migrations.CreateMatches do
  use Ecto.Migration

  def change do
    create table(:matches) do
      add :user1_id, references(:users, on_delete: :restrict), null: false
      add :user2_id, references(:users, on_delete: :restrict), null: false

      timestamps()
    end

    create index(:matches, [:user1_id])
    create index(:matches, [:user2_id])
    create unique_index(:matches, [:user1_id, :user2_id])
  end
end
