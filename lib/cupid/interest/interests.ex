defmodule Cupid.Interest.Interests do
  use Ecto.Schema
  import Ecto.Changeset

  schema "interest" do

    belongs_to(:user, Cupid.Users.User)
    belongs_to(:tag, Cupid.Tags.Tag)

    timestamps()
  end

  @doc false
  def changeset(interests, attrs) do
    interests
    |> cast(attrs, [:user_id, :tag_id])
    |> validate_required([:user_id, :tag_id])
  end
end
