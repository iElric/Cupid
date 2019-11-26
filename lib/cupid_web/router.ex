defmodule CupidWeb.Router do
  use CupidWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", CupidWeb do
    pipe_through :ajax

    resources "/sessions", SessionController, only: [:create], singleton: true
    resources "/users", UserController, only: [:create]
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CupidWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", CupidWeb do
  #   pipe_through :api
  # end
end
