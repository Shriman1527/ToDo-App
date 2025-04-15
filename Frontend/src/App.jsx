

import { useState } from 'react'

import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Todo from  './components/todo/Todo'
import { Footer } from './components/footer/Footer'

function App() {


  return (
    <>
     <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/user/signup' element={<Signup/>}/>
            <Route path='/user/login' element={<Login/>}/>
            <Route path='/user/todo' element={<Todo/>}/>
            <Route/>

          </Routes>
        </BrowserRouter>
        {/* <Footer/> */}
      
     </div>
    </>
  )
}

export default App
