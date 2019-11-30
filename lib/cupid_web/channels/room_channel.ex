defmodule CupidWeb.RoomChannel do
    use CupidWeb, :channel

    def join("room:" <> room_id, _payload, socket) do
        if authorized?(room_id, socket) do
			{:ok, socket}
		else
			{:error, %{reason: "unauthorized"}}
		end
    end

    def handle_in("new_msg", %{"text" => text}, socket) do 

    end


    defp authorized?(id, socket) do
        Cupid.Matches.has_user(id, socket.assigns.current_user.id)
    end

end
