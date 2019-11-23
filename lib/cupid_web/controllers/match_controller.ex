defmodule CupidWeb.MatchController do
  use CupidWeb, :controller

  alias Cupid.Matches
  alias Cupid.Matches.Match
  alias Cupid.Users

  action_fallback CupidWeb.FallbackController
  plug CupidWeb.Plugs.RequireAuth when action in [:index]

  def index(conn, _params) do
    ids = Matches.list_user_matches(conn.assigns[:current_user].id)
    names = Enum.map(ids, fn x -> Users.get_user!(x).name end)

    matches =
      Enum.map(Enum.with_index(ids), fn {x, index} -> %{id: x, name: Enum.at(names, index)} end)
    render(conn, "index.json", matches: matches)
  end

  def create(conn, %{"match" => match_params}) do
    with {:ok, %Match{} = match} <- Matches.create_match(match_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.match_path(conn, :show, match))
      |> render("show.json", match: match)
    end
  end

  def show(conn, %{"id" => id}) do
    match = Matches.get_match!(id)
    render(conn, "show.json", match: match)
  end

  def update(conn, %{"id" => id, "match" => match_params}) do
    match = Matches.get_match!(id)

    with {:ok, %Match{} = match} <- Matches.update_match(match, match_params) do
      render(conn, "show.json", match: match)
    end
  end

  def delete(conn, %{"id" => id}) do
    match = Matches.get_match!(id)

    with {:ok, %Match{}} <- Matches.delete_match(match) do
      send_resp(conn, :no_content, "")
    end
  end
end
