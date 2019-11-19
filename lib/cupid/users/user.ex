defmodule Cupid.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :desc, :string
    field :email, :string
    field :gender, :string
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :gender, :password_hash, :desc])
    |> validate_required([:email, :name, :gender, :password_hash, :desc])
  end
end
