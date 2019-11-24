defmodule CupidWeb.InterestsController do
  use CupidWeb, :controller

  alias Cupid.Interest
  alias Cupid.Interest.Interests

  action_fallback CupidWeb.FallbackController
  plug CupidWeb.Plugs.RequireAuth when action in [:index, :create, :update, :delete]
  def index(conn, _params) do
    IO.inspect("index")
    interest = Interest.list_interest()
    render(conn, "index.json", interest: interest)
  end

  def create(conn, %{"interests" => interests_params}) do
    tag_ids = Map.get(interests_params, "ids")
    interest_params = Enum.map(tag_ids, fn x -> %{tag_id: x} |> Map.put(:user_id, conn.assigns[:current_user].id) end)
    IO.inspect(interest_params)
    Enum.map(interest_params, fn x -> Interest.create_interests(x) end)
    render(conn, "success.json", interests: interest_params)

    #with {:ok, %Interests{} = interests} <- Interest.create_interests(interests_params) do
      #conn
      #|> put_status(:created)
      #|> put_resp_header("location", Routes.interests_path(conn, :show, interests))
      #|> render("show.json", interests: interests)
    #end
  end

  def show(conn, %{"id" => id}) do
    interests = Interest.get_interests!(id)
    render(conn, "show.json", interests: interests)
  end

  def update(conn, %{"id" => id, "interests" => interests_params}) do
    interests = Interest.get_interests!(id)

    with {:ok, %Interests{} = interests} <- Interest.update_interests(interests, interests_params) do
      render(conn, "show.json", interests: interests)
    end
  end

  def delete(conn, %{"id" => id}) do
    interests = Interest.get_interests!(id)

    with {:ok, %Interests{}} <- Interest.delete_interests(interests) do
      send_resp(conn, :no_content, "")
    end
  end

end
