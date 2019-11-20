defmodule CupidWeb.InterestsView do
  use CupidWeb, :view
  alias CupidWeb.InterestsView

  def render("index.json", %{interest: interest}) do
    %{data: render_many(interest, InterestsView, "interests.json")}
  end

  def render("show.json", %{interests: interests}) do
    %{data: render_one(interests, InterestsView, "interests.json")}
  end

  def render("interests.json", %{interests: interests}) do
    %{id: interests.id}
  end
end
