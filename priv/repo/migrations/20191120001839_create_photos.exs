defmodule Cupid.Repo.Migrations.CreatePhotos do
  use Ecto.Migration

  def change do
    create table(:photos) do
      add :uuid, :string, null: false
      add :filename, :string, null: false
      add :desc, :text, default: "No description"
      add :user_id, references(:users, on_delete: :restrict)

      timestamps()
    end

    create index(:photos, [:user_id])
  end
end
