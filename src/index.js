// require('dotenv').config({path: './env'});

import connectDB from './db/index.js';
import dotenv from 'dotenv';
dotenv.config({path: './env'});


connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MongoDB connection failed!!!",err);
})


/*
import {DB_NAME} from './constants.js';
import mongoose from 'mongoose';

import express from 'express';
const app=express();

( async ()=>{
    try{
        mongoose.connect(`${process.env.MONGO_URi}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRROR: ",error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
    catch (error){
        console.error("ERROR: ",error)
        throw error
    }
})

*/