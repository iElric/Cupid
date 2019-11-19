defmodule Cupid.Likes.Like do
  use Ecto.Schema
  import Ecto.Changeset

  schema "likes" do
    field :like_from, :id
    field :like_to, :id

    timestamps()
  end

  @doc false
  def changeset(like, attrs) do
    like
    |> cast(attrs, [])
    |> validate_required([])
  end
end
