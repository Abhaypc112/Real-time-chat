import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Contacts() {
    const[users,setUsers]=useState([]);
    const nav = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/users')
        .then((res)=>setUsers(res.data))
    },[])
    function handleLogout(){
        localStorage.clear()
        nav('/')
      }
  return (
    <div>
        <button onClick={handleLogout}>Log Out</button>
      {
        users.map((user)=>{
            return(
                <h1 onClick={()=>nav(`/chat/${user._id}`)}>{user.name}</h1>
            )
        })
      }
    </div>
  )
}

export default Contacts
