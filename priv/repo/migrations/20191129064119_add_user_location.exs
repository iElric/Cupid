defmodule Cupid.Repo.Migrations.AddUserLocation do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :lan, :decimal, default: 0, null: false
      add :lon, :decimal, default: 0, null: false
      add :addr, :string, default: "", null: false
    end
  end
end
