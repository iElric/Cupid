defmodule CupidWeb.LikeController do
  use CupidWeb, :controller

  alias Cupid.Likes
  alias Cupid.Likes.Like

  action_fallback CupidWeb.FallbackController

  def index(conn, _params) do
    likes = Likes.list_likes()
    render(conn, "index.json", likes: likes)
  end

  def create(conn, %{"like_to_id" => like_to_id}) do
    like_params = %{
      like_from_id: conn.assigns[:current_user].id,
      like_to_id: like_to_id
    }
    with {:ok, %Like{} = like} <- Likes.create_like(like_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.like_path(conn, :show, like))
      |> render("show.json", like: like)
    end
  end

  def show(conn, %{"id" => id}) do
    like = Likes.get_like!(id)
    render(conn, "show.json", like: like)
  end

  def update(conn, %{"id" => id, "like" => like_params}) do
    like = Likes.get_like!(id)

    with {:ok, %Like{} = like} <- Likes.update_like(like, like_params) do
      render(conn, "show.json", like: like)
    end
  end

  def delete(conn, %{"id" => id}) do
    like = Likes.get_like!(id)

    with {:ok, %Like{}} <- Likes.delete_like(like) do
      send_resp(conn, :no_content, "")
    end
  end
end
