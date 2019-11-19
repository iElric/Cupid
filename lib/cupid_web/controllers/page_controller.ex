defmodule CupidWeb.PageController do
  use CupidWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
