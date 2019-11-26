defmodule CupidWeb.ChangesetView do
  use CupidWeb, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `CupidWeb.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
    |> post_process
  end

  defp post_process(%{} = map) do
    map
    |> Enum.map(
         fn {k, v} ->
            k = if k == :password_hash, do: :password, else: k;
           "#{k} #{v}!"
           |> String.capitalize
         end
       )
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end
end
