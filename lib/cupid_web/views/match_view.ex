defmodule CupidWeb.MatchView do
  use CupidWeb, :view
  alias CupidWeb.MatchView

  def render("index.json", %{matches: matches}) do
    %{data: render_many(matches, MatchView, "match.json")}
  end

  def render("show.json", %{match: match}) do
    %{data: render_one(match, MatchView, "match.json")}
  end

  def render("match.json", %{match: match}) do
    IO.inspect(match)
    %{id: match.id, name: match.name}
  end
end
