defmodule CupidWeb.PhotoView do
  use CupidWeb, :view
  alias CupidWeb.PhotoView

  def render("index.json", %{photos: photos}) do
    %{data: render_many(photos, PhotoView, "photo.json")}
  end

  def render("show.json", %{photo: photo}) do
    %{data: render_one(photo, PhotoView, "photo.json")}
  end

  def render("photo.json", %{photo: photo}) do
    %{id: photo.id,
      uuid: photo.uuid,
      filename: photo.filename,
      desc: photo.desc}
  end
end
