import React from 'react';
import Chat from './components/Chat';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Contacts from './components/Contacts';

const App = () => {
  // Example: Replace with actual logged-in userId and receiverId
  const userId = '675e64a95b989edf9b0025ca'; // Replace with sender's ID
  const receiverId = '675e65035b989edf9b0025cc'; // Replace with receiver's ID
  // const userId = '675e65035b989edf9b0025cc'; // Replace with sender's ID
  // const receiverId = '675e64a95b989edf9b0025ca'; // Replace with receiver's ID

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/users' element={<Contacts/>}/>
        <Route path='/chat/:receiverId' element={<Chat userId={userId} receiverId={receiverId} />}/>
      </Routes>
      
    </div>
  );
};

export default App;
