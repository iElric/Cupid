defmodule Cupid.Repo.Migrations.AddUserLocation do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :lan, :string, default: "", null: false
      add :lon, :string, default: "", null: false
    end
  end
end
