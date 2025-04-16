import React, { useState } from 'react'
import axios from 'axios'


import { useNavigate, Navigate, Link } from 'react-router-dom';
import {Button} from '../buttons/Button'

function Login(){

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    const navigate= useNavigate();


    const handleLogin= async (e)=>{
        e.preventDefault();
        try{

            const responce= await axios.post("https://todo-app-vbvj.onrender.com/user/signin",{
                email:email,
                password:password
            })

            
            console.log("Login successfully");
            const token= responce.data.token;
            localStorage.setItem("token",token);
            
            navigate("/user/todo");

           
            


        }catch(err)
        {
            console.log("There is errro");
        }
    }

    const front=()=>{
        navigate("/");
    }




    return (
        <div>
            <Button onClick={front}>Go Back To Home Page</Button>
            <h2 className='text-5xl text-center m-5'>Login Now</h2>
            <p className='text-2xl text-center m-7'>Fill the Details </p>

            <div className='flex flex-col max-w-[80%] m-auto border border-black p-4 gap-3'>
            <label>Enter the email</label>
            <input className='border border-black p-1' type='text' onChange={(e)=>setEmail(e.target.value)}/>

            <label>Enter the password</label>
            <input className='border border-black p-1' type='text' onChange={(e)=>setPassword(e.target.value)}/>

            {/* <button onClick={handleLogin}>Click Login</button> */}
            <Button onClick={handleLogin}>Login </Button>
            </div>
          

        </div>
    )
}

export default Login
