defmodule Cupid.Repo.Migrations.CreateInterest do
  use Ecto.Migration

  def change do
    create table(:interest) do
      add :user_id, references(:users, on_delete: :restrict), null: false
      add :tag_id, references(:tags, on_delete: :restrict), null: false

      timestamps()
    end

    create index(:interest, [:user_id])
    create index(:interest, [:tag_id])
    create unique_index(:interest, [:user_id, :tag_id])
  end
end
