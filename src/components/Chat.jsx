import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');
  const {receiverId} = useParams()
  const nav = useNavigate()

  useEffect(() => {
    // Fetch chat history
    fetch(`http://localhost:5000/chat/${userId}/${receiverId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    // Listen for new messages
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        senderId: userId,
        receiverId,
        message: newMessage,
      };

      socket.emit('chat message', messageData);

      // Add the message locally for the sender
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, timestamp: new Date() },
      ]);

      setNewMessage('');
    }
  };

  function handleLogout(){
    localStorage.clear()
    nav('/')
  }
  return (
    <div>
      <div>
        <button onClick={handleLogout} >Log Out</button>
        <h3>Chat</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderId === userId ? 'You' : "other"}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
