import express from 'express';

const app=express();//we use any variable name (app or any name)

app.listen(8000,function(){
    console.log('server is listening at 8000');
    
});//(8000) is the port