defmodule CupidWeb.UserView do
  use CupidWeb, :view
  alias CupidWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      password_hash: user.password_hash,
      desc: user.desc}
  end
end