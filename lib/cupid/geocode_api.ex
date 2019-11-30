defmodule Cupid..GeocodeApi do

  def getLocation(params) do
    query = []
            |>Keyword.put(:key, api_key())
            |>Keyword.put(:latlng, transform_param(params))
            |>URI.encode_query()
    resp = HTTPoison.get!("#{url()}?#{query}")
    Poison.decode!(resp.body)
    |>Map.get("results")
    |>Enum.at(0)
    |>Map.get("address_components")
    |>getRegion()
    |>Map.reduce("", fn (x, total) -> "#{total},#{x}" end)
    |>String.strip(?,)
  end

  def getRegion() do
    address
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
    lat = Map.get(params, :latitude)
    lon = Map.get(params, :longitude)
    "#{lat},#{lon}"
  end

  def url do
    "https://maps.googleapis.com/maps/api/geocode/json"
  end

end