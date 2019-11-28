defmodule Cupid.Matches.Match do
  use Ecto.Schema
  import Ecto.Changeset

  schema "matches" do
    belongs_to(:users_1, Cupid.Users.User, foreign_key: :user1_id)
    belongs_to(:users_2, Cupid.Users.User, foreign_key: :user2_id)

    has_many(:messages, Cupid.Messages.Message)
    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [:user1_id, :user2_id])
    |> sort_user_id()
    |> unique_constraint(:user1_id, name: :matches_user1_id_user2_id)
    |> validate_required([:user1_id, :user2_id])
  end

  # make sure user1_id < user2_id
  def sort_user_id(cset) do
    user1_id = get_field(cset, :user1_id)
    user2_id = get_field(cset, :user2_id)
    if user1_id > user2_id do
      cset |> put_change(:user1_id, user2_id) |> put_change(:user2_id, user1_id)
    else
      cset
    end
  end
end
