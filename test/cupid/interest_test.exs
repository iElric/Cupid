defmodule Cupid.InterestTest do
  use Cupid.DataCase

  alias Cupid.Interest

  describe "interest" do
    alias Cupid.Interest.Interests

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def interests_fixture(attrs \\ %{}) do
      {:ok, interests} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Interest.create_interests()

      interests
    end

    test "list_interest/0 returns all interest" do
      interests = interests_fixture()
      assert Interest.list_interest() == [interests]
    end

    test "get_interests!/1 returns the interests with given id" do
      interests = interests_fixture()
      assert Interest.get_interests!(interests.id) == interests
    end

    test "create_interests/1 with valid data creates a interests" do
      assert {:ok, %Interests{} = interests} = Interest.create_interests(@valid_attrs)
    end

    test "create_interests/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Interest.create_interests(@invalid_attrs)
    end

    test "update_interests/2 with valid data updates the interests" do
      interests = interests_fixture()
      assert {:ok, %Interests{} = interests} = Interest.update_interests(interests, @update_attrs)
    end

    test "update_interests/2 with invalid data returns error changeset" do
      interests = interests_fixture()
      assert {:error, %Ecto.Changeset{}} = Interest.update_interests(interests, @invalid_attrs)
      assert interests == Interest.get_interests!(interests.id)
    end

    test "delete_interests/1 deletes the interests" do
      interests = interests_fixture()
      assert {:ok, %Interests{}} = Interest.delete_interests(interests)
      assert_raise Ecto.NoResultsError, fn -> Interest.get_interests!(interests.id) end
    end

    test "change_interests/1 returns a interests changeset" do
      interests = interests_fixture()
      assert %Ecto.Changeset{} = Interest.change_interests(interests)
    end
  end
end
