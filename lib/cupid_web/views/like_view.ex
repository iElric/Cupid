defmodule CupidWeb.LikeView do
  use CupidWeb, :view
  alias CupidWeb.LikeView

  def render("index.json", %{likes: likes}) do
    %{data: render_many(likes, LikeView, "like.json")}
  end

  def render("show.json", %{like: like}) do
    %{data: render_one(like, LikeView, "like.json")}
  end

  def render("like.json", %{like: like}) do
    %{id: like.id}
  end

  def render("like_user.json", _) do
    %{data: "success"}
  end
end
