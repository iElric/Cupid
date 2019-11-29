defmodule Cupid.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :desc, :string
    field :email, :string
    field :gender, :string
    field :name, :string
    field :password_hash, :string
    field :lan, :decimal
    field :lon, :decimal

    has_many(:likes_from, Cupid.Likes.Like, foreign_key: :like_from_id)
    has_many(:likes_to, Cupid.Likes.Like, foreign_key: :like_to_id)

    has_many(:photos, Cupid.Photos.Photo)
    has_many(:interests, Cupid.Interest.Interests)
    has_many(:tags, through: [:interests, :tag])

    has_many(:user1s, Cupid.Matches.Match, foreign_key: :user1_id)
    has_many(:user2s, Cupid.Matches.Match, foreign_key: :user2_id)

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    # cast keys from attrs passed into the change set
    |> cast(attrs, [:email, :name, :password, :password_confirmation, :gender, :lan, :lon])
      # this validation will check if both "password" and "password_confirmation" in the parameter map matches
    |> validate_confirmation(:password)
    |> validate_length(:password, min: 12) # too short
    |> hash_password()
    |> validate_required([:email, :name, :password_hash])
    |> unique_constraint(:email)
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    if pw do
      change(cset, Argon2.add_hash(pw))
    else
      cset
    end
  end
end
