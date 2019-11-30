defmodule CupidWeb.NotiChannel do
    use CupidWeb, :channel


    def join("notification:" <> user_id, _payload, socket) do
        if authorized?(user_id, socket) do
			{:ok, socket}
		else
			{:error, %{reason: "unauthorized"}}
		end
    end


    defp authorized?(id, socket) do
        IO.inspect(id)
        IO.inspect(socket.assigns.current_user.id == id)
        IO.inspect(socket.assigns.current_user.id)
        with {id, _rest} = Integer.parse(id) do
            socket.assigns.current_user.id == id
        end
    end
    
    def handle_info({:new_interest, user}, socket) do
        {:noreply, socket}
    end
    
end