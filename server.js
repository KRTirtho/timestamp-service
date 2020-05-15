const express = require('express')
const app = express();


app.use("/", express.static(__dirname+"/view")) //needs to change in Glitch

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/view/index.html")
})

app.get('/api/timestamp/:date_string?', (req, res)=>{
    let dateString = req.params.date_string
    let date;
    //If there is no params available
    if(!dateString){
        date = new Date()
    }    
    else{
        if(!isNaN(dateString)){
            date = new Date(parseInt(dateString))
        }
        else{
            date = new Date(dateString)
        }
    }

    //If provided date format in the params is false
    if(date.toString() === "Invalid Date"){
        res.json({error: date.toString()})
    }

    //When everything is valid
    else{
        res.json({
            unix:date.getTime(),
            utc: date.toUTCString()
        })
        console.log(req.params.date_string);
    }
})

app.listen(1100)