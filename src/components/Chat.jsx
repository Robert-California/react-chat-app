import { useState, useEffect } from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { auth, db } from "../firebase-config";
import PropTypes from "prop-types";
export const Chat = (props) => {

    const {room} = props;

    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() =>{
       const queryMessages = query(messagesRef, where ("room", "==", room), orderBy("createdAt"));
       const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
           snapshot.forEach((doc) => {
            messages.push({...doc.data(), id: doc.id});
           });
           setMessages(messages);
        });
        return () => unsubscribe();

    },[]);



const handleSubmit = async (e) =>{
    e.preventDefault();
    if(newMessage === "") return;
    await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room: room,

    });
    setNewMessage("");
       
    }

    
    
    
    
    
    return (
        <div>
            <div><h1>
                Welcome To: {room.toUpperCase()}</h1></div>

            <div>
                {messages.map((message) => (
                <div key={message.id}>
                    <span>{message.user}: </span>
                    {message.text}
                </div>
            ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input placeholder="type your message here" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )

}

Chat.propTypes = {
    room: PropTypes.string.isRequired,
  };