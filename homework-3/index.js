const express = require("express");

const app = express();


app.use(express.json());

const start = async ()=>{
    try{
        app.listen( 3000 , ()=>{
            console.log(`Server running at http://localhost:${3000}`);
        })
    }catch (e) {
        console.error(e);
    }
}

start();