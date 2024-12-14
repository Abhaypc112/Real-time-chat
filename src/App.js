import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // Connect to the backend

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Listen for messages from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  // Send a message
  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        content: message,
        time: new Date(Date.now()).toLocaleTimeString(),
      };
      socket.emit('send_message', messageData); // Send message to the server
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Real-Time Chat App</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
        {messageList.map((msg, index) => (
          <div key={index}>
            <p>
              <strong>{msg.time}</strong>: {msg.content}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
}

export default App;
