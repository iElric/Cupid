defmodule Cupid.Likes.Like do
  use Ecto.Schema
  import Ecto.Changeset

  schema "likes" do
    # have to have different association names
    belongs_to(:user_like_from, Cupid.Users.User, foreign_key: :like_from_id)
    belongs_to(:user_like_to, Cupid.Users.User, foreign_key: :like_to_id)

    timestamps()
  end

  @doc false
  def changeset(like, attrs) do
    like
    |> cast(attrs, [:like_from_id, :like_to_id])
    |> unique_constraint(:like_from_id, name: :likes_like_from_id_like_to_id)
    |> validate_required([:like_from_id, :like_to_id])
  end
end
