const express=require('express');
const fs=require('fs');
const app=express();
const PORT=8000;

app.use(express.static('.'));

app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`);});

app.get('/api/employees',(req,res)=>{
    fs.readFile('employees.json',(err,data)=>{
        if(err) return res.send("Error while fetching data!");
        return res.json(JSON.parse(data));
    })
})