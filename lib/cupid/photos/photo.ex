defmodule Cupid.Photos.Photo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "photos" do
    field :desc, :string
    field :filename, :string
    field :uuid, :string
    field :user_id, :id

    belongs_to(:users, Cupid.Users.User)
    timestamps()
  end

  @doc false
  def changeset(photo, attrs) do
    photo
    |> cast(attrs, [:uuid, :filename, :desc])
    |> validate_required([:uuid, :filename, :desc])
  end
end
