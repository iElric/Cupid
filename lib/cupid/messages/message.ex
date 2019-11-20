defmodule Cupid.Messages.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :msg, :string

    belongs_to(:match, Cupid.Matches.Match)

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:msg])
    |> validate_required([:msg])
  end
end
