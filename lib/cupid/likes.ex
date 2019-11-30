defmodule Cupid.Likes do
  @moduledoc """
  The Likes context.
  """

  import Ecto.Query, warn: false
  alias Cupid.Repo

  alias Cupid.Likes.Like

  @doc """
  Returns the list of likes.

  ## Examples

      iex> list_likes()
      [%Like{}, ...]

  """
  def list_likes do
    Repo.all(Like)
  end

  @doc """
  Gets a single like.

  Raises `Ecto.NoResultsError` if the Like does not exist.

  ## Examples

      iex> get_like!(123)
      %Like{}

      iex> get_like!(456)
      ** (Ecto.NoResultsError)

  """
  def get_like!(id), do: Repo.get!(Like, id)

  def get_like(like_from_id, like_to_id) do
    query = from(l in Like, where: l.like_from_id == ^like_from_id and l.like_to_id == ^like_to_id)
    Repo.one(query)
  end

  def get_likes_by_like_from_id(like_from_id) do
    query = from(l in Like, where: l.like_from_id == ^like_from_id)
    Repo.all(query)
  end

  @doc """
  Creates a like.

  ## Examples

      iex> create_like(%{field: value})
      {:ok, %Like{}}

      iex> create_like(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_like(attrs \\ %{}) do
    {:ok, like} = %Like{}
                  |> Like.changeset(attrs)
                  |> Repo.insert(on_conflict: :nothing)
    if is_nil(like.id) do
      {:error, "Like relationship is unique"}
    else
      {:ok, like}
    end
  end

  @doc """
  Updates a like.

  ## Examples

      iex> update_like(like, %{field: new_value})
      {:ok, %Like{}}

      iex> update_like(like, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_like(%Like{} = like, attrs) do
    like
    |> Like.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Like.

  ## Examples

      iex> delete_like(like)
      {:ok, %Like{}}

      iex> delete_like(like)
      {:error, %Ecto.Changeset{}}

  """
  def delete_like(%Like{} = like) do
    Repo.delete(like)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking like changes.

  ## Examples

      iex> change_like(like)
      %Ecto.Changeset{source: %Like{}}

  """
  def change_like(%Like{} = like) do
    Like.changeset(like, %{})
  end
end
