import React, { useEffect, useState , createContext, useContext, use } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';


import axios from 'axios'
import {Button} from '../buttons/Button'


// Here I create the context API
const TodoContext= createContext();




function Todo(){

    const [showCreateTodo, setShowCreateTodo]= useState(false);

    const [showTodo,setShowTodo]= useState(false);

    const [todos,setTodos]= useState([]);


       const navigate= useNavigate();

    const front=()=>{
        navigate("/user/login");
    }


    const token= localStorage.getItem('token');



    const updatedTodo=async (todoId,newTitle)=>{

        if (!token) {
            console.error("No token found! User not authenticated.");
            return;
        }  


        try{

            const responce = await axios.put(`todo-app-tau-ten-57.vercel.app/user/todo/${todoId}`,
                {newTodo:newTitle},
                {
                    headers:{
                        token:token
                    }
                }
            )

            setTodos(
                todos.map((todo) =>
                    todo._id === todoId ? { ...todo, title: newTitle } : todo
                )
            );

        }catch(err)
        {
            console.log("There is error while updating the todo");

        }


    }

    const deleteTodo= async (todoId)=>{

        
        if (!token) {
            console.error("No token found! User not authenticated.");
            return;
        }  
    
        try{
            await axios.delete(`todo-app-tau-ten-57.vercel.app/user/todo/${todoId}`, {
                headers:{
                    token:token
                }
            })


            console.log('todo deleted with id ${todoId}');

            setTodos(todos.filter((todo) => todo._id !== todoId));


        }
        catch(err){
            console.log("There is error while delelting the todos");

        }

}



    return (
        <div >
        <TodoContext.Provider value={
            {todos:todos,
            setTodos:setTodos,
            deleteTodo:deleteTodo,
            
            updatedTodo:updatedTodo}
        }>
            {/* <button onClick={front}>Go back to login page</button> */}
            <Button onClick={front}>Go Back To Login Page</Button>
           <h1 className='text-5xl text-center'>Create A todo</h1>
           {/* <button onClick={()=> setShowCreateTodo(true)}>create atodo</button>
           <button onClick={()=> setShowTodo(true)}>Get All Todos</button> */}
           <div className='flex justify-center gap-5'>
           <Button onClick={()=> setShowCreateTodo(true)}>Create a new Todo</Button>
           <Button onClick={()=> setShowTodo(true)}>Get All The Todos</Button>
          
           </div>
           {showCreateTodo && <CreateTodo/>}
           { showTodo && <GetAll />}
          

           </TodoContext.Provider>

        </div>
    )
}



function CreateTodo(){
    
    const [title,setTitle]= useState('');

    const [add,setAdd]=useState(false);

    const {todos, setTodos,deleteTodo,updatedTodo}=useContext(TodoContext);

    const [iD,setId]= useState('');

    




   



    const token= localStorage.getItem('token');

  
// Add todo functionality 
    const addTodo= async(e)=>{
        e.preventDefault();

        if (!token) {
            console.error("No token found! User not authenticated.");
            return;
        }
       
        try{
            const  responce= await axios.post("todo-app-tau-ten-57.vercel.app/user/todo",
                {

                title:title,
                done:false

            },{
                headers:{
                    token:token
                }
            });


            const newTodo= responce.data.newTodo;

            console.log("Todo create successfully", newTodo);
            setTodos([...todos, newTodo ]);

            setId(newTodo._id);


           
            setAdd(true);
            setTitle('');

          




            

        }
        catch(err){
            console.log("Threre is eror while crearting todo");

        }
        


    }

    return (
        <div className='flex flex-col max-w-[80%] m-auto p-6'>
            <label>Enter the Title of Todo</label>
            <input className='border border-black p-1' type='text' value={title}  onChange={(e)=>setTitle(e.target.value) }/>
            {/* <button onClick={addTodo}  >Add a Todo</button> */}
            <Button onClick={addTodo}>Add a Todo</Button>
           
            {/* {
  add &&
  todos.map((todo) => (
    <AppendTodo key={todo._id} todoId={todo._id} todo={todo.title} deleteTodo={deleteTodo} updatedTodo={updatedTodo} />
  ))
} */}
           




        </div>
    )
}






function GetAll(){
    const token= localStorage.getItem('token');
    
    const {todos,setTodos,deleteTodo,updatedTodo}=useContext(TodoContext);
    

    useEffect(
        function(){

            getall();
            console.log("Under the useEffect");

        },[token]);


      


    const getall= async (e)=>{

        if (!token) {
            console.error("No token found! User not authenticated.");
            return;
        }
        
        try{
            const responce= await axios("todo-app-tau-ten-57.vercel.app/user/todos",{
                headers:{
                    token:token
                }
            });

            console.log("Todo fetch successfully");

            const todos= responce.data.todos;

           setTodos(todos);





       

        }catch(err)
        {
            console.log("There is error while fetching all the todos");
    
        }
    }


   

   
  



    return <div className='flex flex-col mx-auto max-w-[80%] justify-center'>
        <h1 className='text-5xl text-center'>This is all the Todos</h1>
        <p className='text-2xl text-center'>This is the all the things you want to do it today</p>
        {todos.map((todo) => (
                <AppendTodo key={todo._id} todoId={todo._id}  todo={todo.title} deleteTodo={deleteTodo} updatedTodo={updatedTodo} />
            ))}
    </div>
    
}


function AppendTodo({todoId,todo, deleteTodo, updatedTodo}){

    const [isEditing,setIsEditing]= useState(false);
    const [newTitle,setNewTitle]= useState(todo);





   
    return <div id={todoId}>
        
        {isEditing ? (
            <>
            <input
                className='border border-black p-1'
                type='text'
                value={newTitle}
                onChange={(e)=>setNewTitle(e.target.value)}

            />
            {/* <button onClick={()=>{ updatedTodo(todoId, newTitle) ; setIsEditing(false)}}>Save</button>
            <button onClick={()=>setIsEditing(false)}>Cancel</button> */}
            <Button onClick={()=>{ updatedTodo(todoId, newTitle) ; setIsEditing(false)}}>Save</Button>
            <Button onClick={()=>setIsEditing(false)}>Cancel</Button>
            </>
        ):(
        <>
        <div className='border border-black p-4 m-4 gap-2'>
        <h2 className='text-xl'>{todo}</h2>
      
      <Button onClick={()=>setIsEditing(true)}>Update</Button>
      <Button onClick={()=>deleteTodo(todoId)}>Delete</Button>
        </div>
        
        </>
        ) }
       
    </div>
}


export default Todo;
