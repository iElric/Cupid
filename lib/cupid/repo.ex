defmodule Cupid.Repo do
  use Ecto.Repo,
    otp_app: :cupid,
    adapter: Ecto.Adapters.Postgres
end
