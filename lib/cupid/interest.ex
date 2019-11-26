defmodule Cupid.Interest do
  @moduledoc """
  The Interest context.
  """

  import Ecto.Query, warn: false
  alias Cupid.Repo

  alias Cupid.Interest.Interests

  @doc """
  Returns the list of interest.

  ## Examples

      iex> list_interest()
      [%Interests{}, ...]

  """
  def list_interest do
    Repo.all(Interests)
  end

  def list_interest_by_user_id(user_id) do
    query = from(m in Interests, where: m.user_id == ^user_id)
    Repo.all(query)
  end

  @doc """
  Gets a single interests.

  Raises `Ecto.NoResultsError` if the Interests does not exist.

  ## Examples

      iex> get_interests!(123)
      %Interests{}

      iex> get_interests!(456)
      ** (Ecto.NoResultsError)

  """
  def get_interests!(id), do: Repo.get!(Interests, id)

  @doc """
  Creates a interests.

  ## Examples

      iex> create_interests(%{field: value})
      {:ok, %Interests{}}

      iex> create_interests(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_interests(attrs \\ %{}) do
    %Interests{}
    |> Interests.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a interests.

  ## Examples

      iex> update_interests(interests, %{field: new_value})
      {:ok, %Interests{}}

      iex> update_interests(interests, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_interests(%Interests{} = interests, attrs) do
    interests
    |> Interests.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Interests.

  ## Examples

      iex> delete_interests(interests)
      {:ok, %Interests{}}

      iex> delete_interests(interests)
      {:error, %Ecto.Changeset{}}

  """
  def delete_interests(%Interests{} = interests) do
    Repo.delete(interests)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking interests changes.

  ## Examples

      iex> change_interests(interests)
      %Ecto.Changeset{source: %Interests{}}

  """
  def get_match_user_id(user_id) do
    current_user_interests = list_interest_by_user_id(user_id)
    current_user_tag_ids = Enum.map(current_user_interests, fn x-> x.tag_id end)
    query = from(i in Interests, where: i.tag_id in ^current_user_tag_ids,
    group_by: i.user_id, having: count(i.id) >= 2)
    Repo.all(query)
  end

  def change_interests(%Interests{} = interests) do
    Interests.changeset(interests, %{})
  end
end
