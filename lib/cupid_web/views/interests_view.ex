defmodule CupidWeb.InterestsView do
  use CupidWeb, :view
  alias CupidWeb.InterestsView
  alias Cupid.Tags

  def render("index.json", %{interest: interest}) do
    %{data: render_many(interest, InterestsView, "interests.json")}
  end

  def render("show.json", %{interests: interests}) do
    %{data: render_one(interests, InterestsView, "interests.json")}
  end

  def render("interests.json", %{interests: interests}) do
    name = Tags.get_tag!(interests.tag_id).name
    %{id: interests.id, tag_id: interests.tag_id, tag_name: name}
  end

  def render("success.json", _) do
    %{data: "success"}
  end
end
