defmodule CupidWeb.InterestsControllerTest do
  use CupidWeb.ConnCase

  alias Cupid.Interest
  alias Cupid.Interest.Interests

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:interests) do
    {:ok, interests} = Interest.create_interests(@create_attrs)
    interests
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all interest", %{conn: conn} do
      conn = get(conn, Routes.interests_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create interests" do
    test "renders interests when data is valid", %{conn: conn} do
      conn = post(conn, Routes.interests_path(conn, :create), interests: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.interests_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.interests_path(conn, :create), interests: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update interests" do
    setup [:create_interests]

    test "renders interests when data is valid", %{conn: conn, interests: %Interests{id: id} = interests} do
      conn = put(conn, Routes.interests_path(conn, :update, interests), interests: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.interests_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, interests: interests} do
      conn = put(conn, Routes.interests_path(conn, :update, interests), interests: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete interests" do
    setup [:create_interests]

    test "deletes chosen interests", %{conn: conn, interests: interests} do
      conn = delete(conn, Routes.interests_path(conn, :delete, interests))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.interests_path(conn, :show, interests))
      end
    end
  end

  defp create_interests(_) do
    interests = fixture(:interests)
    {:ok, interests: interests}
  end
end
