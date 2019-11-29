defmodule CupidWeb.UserController do
  use CupidWeb, :controller

  alias Cupid.Users
  alias Cupid.Users.User

  action_fallback CupidWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)
    with {:ok, %User{} = user} <- Users.update_user_desc_by_id(id, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def update(conn, %{"id" => id, "latitude" => lan, "longitude" => lon}) do
    IO.inspect("start testing update");
    IO.inspect(lan);
    IO.inspect(lon);
    IO.inspect("end testing update");
    if is_float(lan) do
      IO.inspect("hhh")
    end

    with {:ok, %User{} = user} <- Users.update_user_lan_lon_by_id(id, lan, lon) do
      IO.inspect("updated the lan and lon");
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
