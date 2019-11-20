defmodule Cupid.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :msg, :text, null: false
      add :match_id, references(:matches, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:messages, [:match_id])
  end
end
