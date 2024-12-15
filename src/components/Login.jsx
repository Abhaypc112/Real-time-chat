import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [inputData,setInputData] = useState({name:"",password:""});
    const nav = useNavigate();
     
    function handleOnChange (e){
        const{name,value} = e.target;
        setInputData({...inputData,[name]:value})
    }
    function verifyLogin(){
        axios.post(`http://localhost:5000/login`,inputData)
        .then((res)=>{
            localStorage.setItem("userId",res.data._id)
            localStorage.setItem("name",res.data.name)
            nav('/users')
        })
    }
  return (
    <div style={{display:"flex", marginTop:"10rem", alignItems:"center", justifyContent:"space-evenly", height:"20vh", flexDirection:"column"}}>
        <input name='name' onChange={handleOnChange} type="text" placeholder='Enter username'/>
        <input name='password' onChange={handleOnChange} type="text" placeholder='Enter password'/>
        <button onClick={verifyLogin}>Login</button>
    </div>
  )
}

export default Login
