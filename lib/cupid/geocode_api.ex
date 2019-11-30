defmodule Cupid.GeocodeApi do

  def getLocation(params) do
    case params do
      nil -> ""
      "" -> ""
      _ -> query = []
            |>Keyword.put(:key, api_key())
            |>Keyword.put(:latlng, transform_param(params))
            |>URI.encode_query()

            IO.inspect(query)
            IO.inspect("#{url()}?#{query}")
            resp = HTTPoison.get!("#{url()}?#{query}")
            IO.inspect("resp")
            IO.inspect(resp)
            Jason.decode!(resp.body)
            |>Map.get("results")
            |>Enum.at(0)
            |>Map.get("address_components")
            |>getRegion()
            |>Enum.reduce("", fn (x, total) -> "#{total},#{x}" end)
            |>String.strip(?,)
    end
  end

  def getRegion(address_compoents) do
    address_compoents
    |> Enum.filter(fn x -> !isExcludeTypes(Map.get(x, "types")) end)
    |> Enum.map(fn x -> Map.get(x, "long_name") end)
  end

  def isExcludeTypes(e) do
    Enum.member?(e, "street_number") ||
      Enum.member?(e, "route")||
      Enum.member?(e, "postal_code")
  end

  def api_key do
    # key here. please ask admin for this
  end

  def transform_param(params) do
    lat = params[:latitude]
    lon = params[:longitude]
    "#{lat},#{lon}"
  end

  def url do
    "https://maps.googleapis.com/maps/api/geocode/json"
  end

end