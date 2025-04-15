require("dotenv").config();


const {Router}= require('express');

const jwt= require('jsonwebtoken');



const {userMiddlewares}= require('../middlewares/user');

// const  {JWT_USER_PASSWORD} = require("../config");
const JWT_USER_PASSWORD= process.env.JWT_USER_PASSWORD;

console.log(JWT_USER_PASSWORD);


// const JWT_SECRET= "user@123";
// const JWT_SECRET =process.env.JWT_USER_PASSWORD;
// console.log("JWT_SECRET:", JWT_SECRET);  // Debugging





const { UserModel, TodoModel } = require('../db');



const userRouter= Router();



userRouter.post("/signup",async  function(req,res){


    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;



    try{
        await UserModel.create({
            email:email,
            password:password,
            name:name
        })

        res.json({
            message:"Signup successed"

        })
    }
    catch(e)
    {
        res.json({
            message:"SignUp failed"

        })
    }
})



userRouter.post("/signin",async function (req,res){

    const email= req.body.email;
    const password= req.body.password;


    const user= await UserModel.findOne({
        email:email,
        password:password

    })

    if(user){
        const token = jwt.sign({
            id:user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token:token
        })



    }
    else
    {
        res.status(403).json({
            message:"Incorrect Credentials"

        })
    }

})



userRouter.post("/todo", userMiddlewares,async function(req,res){
    const userID= req.userId;

    const title= req.body.title;
    const done= req.body.done;

    try{
        const todoObject= await TodoModel.create({
            userId:userID,
            title:title,
            done:done
        })

        res.json({
           newTodo:todoObject,
           message:"To do created successfully"
        })
    
    }
    catch(e){
        res.json({
            message:"There is error while creating the todo"

        })
    }
    

})


userRouter.get("/todos",userMiddlewares,async  function(req,res){

    const userId= req.userId;

    try{
        const todos= await TodoModel.find({
            userId:userId
        })

        res.json({
            success:true,
            todos:todos,
            message:"To do fetched successfully"
        })
    }
    catch(e){
      res.json({
          message:"There is error while fetching the todos"
      })
    }

})


userRouter.put("/todo/:id", userMiddlewares,async  function(req,res){
    const updateId= req.params.id;
    const newTodo= req.body.newTodo;

    try{
        const updatedTodo= await TodoModel.findByIdAndUpdate(
            updateId,
            {
                title:newTodo
            },
            {
                new:true
            }
        )

        res.json({
            success:true,
            message:"Todo updated successfully",
            updatedTodo,
            
        })
    }catch(e){
        res.json({
            message:"There is error while updating the todo"
        })
    }
    
})


userRouter.delete("/todo/:id",userMiddlewares,  async function(req,res){

    const deleteId=req.params.id;
   
    
    try{
        const deletedTodo= await TodoModel.findByIdAndDelete(deleteId);

        if(!deletedTodo){
            return res.status(403).json({message:"to do not found"})
        }
        res.json({
            message:"todo deleted successfully",
            deletedTodo
        })

    }
    catch(e)
    {
        res.json({
            message:"Thre is error while delelting the todo"
        })
    }

})


module.exports={
    userRouter:userRouter
}
