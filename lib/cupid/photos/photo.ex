defmodule Cupid.Photos.Photo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "photos" do
    field :desc, :string
    field :filename, :string
    field :uuid, :string
    field :photo_upload, :any, virtual: true
    belongs_to(:user, Cupid.Users.User)
    timestamps()
  end

  @doc false
  def changeset(photo, attrs) do
    photo
    |> cast(attrs, [:user_id, :desc, :photo_upload, :filename])
    |> validate_required([:user_id, :desc, :photo_upload, :filename])
    |> generate_uuid()
    |> save_photo_upload()
  end

  def generate_uuid(cset) do
    if get_field(cset, :uuid) do
      cset
    else
      put_change(cset, :uuid, make_uuid())
    end
  end

  def make_uuid() do
    :crypto.strong_rand_bytes(16)
    |> Base.encode16
  end

  def save_photo_upload(cset) do
    up = get_field(cset, :photo_upload)
    file_name = get_field(cset, :filename)
    uuid = get_field(cset, :uuid)
    if up do
      dir = photo_upload_dir(uuid)
      File.mkdir_p!(dir)
      # write the base64 string of image to this location
      # delete photo_upload since we don't need to insert it in database
      File.write!(Path.join(dir, file_name), up)
      delete_change(cset, :photo_upload)
    else
      cset
    end
  end

  def photo_upload_dir(uuid) do
    base = Path.expand("~/.local/data/cupid/photos/")
    Path.join(base, uuid)
  end

end
