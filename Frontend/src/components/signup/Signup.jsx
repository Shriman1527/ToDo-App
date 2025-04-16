import React from 'react'

import { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {Button} from '../buttons/Button'



function Signup(){

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [name,setName]= useState('');

    const navigate= useNavigate();

    const hadleSignup= async (e)=>{
       
        try{

            const responce= await axios.post('https://todo-app-backend-ch4v.onrender.com/user/signup',{
                email:email,
                password:password,
                name:name
            })

            console.log("Sign up suceesfully");
            navigate("/");

            
        }
        catch(err)
        {
            console.log(err);

            console.log("There is error while signup");

        }
    }

    return (
        <div className='bg-[#eefcfd] '>
            <h1 className='text-center text-5xl m-5'>Sign up now</h1>
            <p className='text-center text-2xl my-7'>Fill the Information</p>

            <div className='mx-20 flex flex-col max-w-[80%] border border-black p-4 gap-3'>
            <label>Enter the Email</label>
            <input className='border border-black p-1' type='text' onChange={(e)=> setEmail(e.target.value)}/>
            <label>Enter the password</label>
            <input className='border border-black p-1' type='text' onChange={(e)=> setPassword(e.target.value)}/>
            <label>Enter the Name</label>
            <input className='border border-black p-1' type='text' onChange={(e)=> setName(e.target.value)}/>
            {/* <button onClick={hadleSignup}>Sign Up</button> */}
            <Button onClick={hadleSignup}>Sign Up</Button>
            </div>
          

        </div>
    )
}

export default Signup;



