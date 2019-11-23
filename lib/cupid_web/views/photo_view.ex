defmodule CupidWeb.PhotoView do
  use CupidWeb, :view
  alias CupidWeb.PhotoView

  def render("index.json", %{photos: photos}) do
    %{data: render_many(photos, PhotoView, "photo.json")}
  end

  def render("show.json", %{photo: photo}) do
    %{data: render_one(photo, PhotoView, "create_photo.json")}
  end

  def render("photo.json", %{photo: photo}) do
    %{id: photo.id,
      photo: photo.data,
      desc: photo.desc}
  end

  def render("create_photo.json", _) do
    %{
       status: "success"
    }
  end
end
