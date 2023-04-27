import { useState } from "react";

export const Chat = () => {

    const [newMessage, setNewMessage] = useState("");


const handleSubmit = (e) =>{
    e.preventDefault();
    


}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="type your message here" onChange={(e) => setNewMessage(e.value.target)}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}