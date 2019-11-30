defmodule Cupid.Matches do
  @moduledoc """
  The Matches context.
  """

  import Ecto.Query, warn: false
  alias Cupid.Repo

  alias Cupid.Matches.Match
  alias Cupid.Users.User

  @doc """
  Returns the list of matches.

  ## Examples

      iex> list_matches()
      [%Match{}, ...]

  """
  def list_matches do
    Repo.all(from m in Match, preload: [:users_1, :users_2])
  end

  def list_friends(id) do
    query = from m in Match, 
              where: m.user1_id == ^id or m.user2_id == ^id,
              preload: [:users_1, :users_2]
    Repo.all(query)
    |> Enum.map( fn m -> 
      if m.users_1.id == id do
        %{id: m.id, user: friend(m.users_2)}  
      else
        %{id: m.id, user: friend(m.users_1)}  
      end
    end)
  end

  defp friend(%User{} = u) do
    %{
      id: u.id,
      email: u.email,
      name: u.name
    }
  end

  def has_user(mid, uid) do
    m = get_match!(mid)
    uid == m.user1_id or uid == m.user2_id
  end



  @doc """
  Gets a single match.

  Raises `Ecto.NoResultsError` if the Match does not exist.

  ## Examples

      iex> get_match!(123)
      %Match{}

      iex> get_match!(456)
      ** (Ecto.NoResultsError)

  """
  def get_match!(id), do: Repo.get!(Match, id)

  @doc """
  Creates a match.

  ## Examples

      iex> create_match(%{field: value})
      {:ok, %Match{}}

      iex> create_match(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_match(attrs \\ %{}) do
    %Match{}
    |> Match.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a match.

  ## Examples

      iex> update_match(match, %{field: new_value})
      {:ok, %Match{}}

      iex> update_match(match, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_match(%Match{} = match, attrs) do
    match
    |> Match.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Match.

  ## Examples

      iex> delete_match(match)
      {:ok, %Match{}}

      iex> delete_match(match)
      {:error, %Ecto.Changeset{}}

  """
  def delete_match(%Match{} = match) do
    Repo.delete(match)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking match changes.

  ## Examples

      iex> change_match(match)
      %Ecto.Changeset{source: %Match{}}

  """
  def change_match(%Match{} = match) do
    Match.changeset(match, %{})
  end
end
