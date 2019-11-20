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
    |> validate_required([:user1_id, :user2_id])
  end
end
