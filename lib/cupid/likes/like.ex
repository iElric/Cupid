defmodule Cupid.Likes.Like do
  use Ecto.Schema
  import Ecto.Changeset

  schema "likes" do
    belongs_to(:users, Cupid.Users.User)
    belongs_to(:users, Cupid.Users.User)

    timestamps()
  end

  @doc false
  def changeset(like, attrs) do
    like
    |> cast(attrs, [])
    |> validate_required([])
  end
end
