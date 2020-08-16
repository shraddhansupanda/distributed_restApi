const express = require('express');
const bodyParser = require('body-parser');
const axios=require('axios');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/',(req,res)=>{
    res.send("<h1>yo you<h1> ")
}) 


app.get('/firstservice/:uid/:status',(req,res)=>{
    var status={
        "uid":req.params.uid,
        "status":req.params.status
    }

    

    if (req.params.status == "200"){
        axios.get(`http://localhost:3000/secondservice/${req.params.uid}`)
                                                        .then(response=>{
                                                                console.log(response.data)
                                                                res.send(response.data)
                                                        })
                                                      .catch(error=>{
                                                                console.log(error)
                                                                res.send("fail")
                                                        })
    }
    else if (req.params.status=='500'){
        axios.get(`http://localhost:3000/reversbooking/${req.params.uid}`)
        .then(response=>{
                console.log(response.data)
        })
      .catch(error=>{
                console.log(error)
        })
    }

    // res.send(status)
})

app.get('/secondservice/:uid/:status',(req,res)=>{
    var status={
        "uid":req.params.uid,
        "status":req.params.status
    }

    

    if (req.params.status == "200"){
        axios.get(`http://localhost:3000/thirdservice/${req.params.uid}`)
                                                        .then(response=>{
                                                                console.log(response.data)
                                                                res.send(response.data)
                                                        })
                                                      .catch(error=>{
                                                                console.log(error)
                                                                res.send("fail")
                                                        })
    }
    else{
    axios.get(`http://localhost:3000/reversbooking/${req.params.uid}`)
    .then(response=>{
            console.log(response.data)
            res.send({"status":"pass"})
    })
    .catch(error=>{
            console.log(error)
            res.send({"status":"fail"})
    })
    }

    // res.send(status)
})


app.get('/thirdservice/:uid/:status',(req,res)=>{
    var status={
        "uid":req.params.uid,
        "status":req.params.status
    }

    

    if (req.params.status == "200"){
        console.log("Data successfully entered")
    }
    else{
    axios.get(`http://localhost:3000/reversbooking/${req.params.uid}`)
    .then(response=>{
            console.log(response.data)
            res.send({"status":"pass"})
    })
    .catch(error=>{
            console.log(error)
            res.send({"status":"fail"})
    })
    }

    // res.send(status)
})



// listen for requests
app.listen(3004, () => {
    console.log("Server is listening on port 3004");
});