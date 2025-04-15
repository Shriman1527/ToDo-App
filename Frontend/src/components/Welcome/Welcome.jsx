import React from 'react'

import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import {Button} from '../buttons/Button'

function Welcome(){
    const navigate= useNavigate();

    function handleSi(){
        navigate("/user/signup");

    }

    function handleLo(){
        navigate("/user/login")
    }

    return <div className='bg-[#eefcfd] h-screen w-full '>
    <div className='max-w-[80%] m-auto'>
    <h1 className=' text-5xl m-auto text-center px-3 py-8'>Welcome to Our To do app</h1>
    <p className='text-2xl m-auto text-center '>Start to track your progress</p>
        
        <div className='flex justify-center my-10'>
        {/* <button className='border border-black p-3 m-2 rounded-md' onClick={handleSi}> Click to signup</button>
        <button className='border border-black p-3 m-2 rounded-md' onClick={handleLo}>Click to Login </button> */}
        <Button onClick={handleSi}>Click to Signup</Button>
        <Button onClick={handleLo}>Click to login</Button>
        </div>

    </div>
       
      

    </div>
}


export default Welcome;
