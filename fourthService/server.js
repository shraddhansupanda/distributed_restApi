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
    if (status.uid == "200"){
        axios.get(`http://localhost:3000/secondservice/${status.uid}`)
                                                        .then(response=>{
                                                                console.log(response.data)
                                                        })
                                                      .catch(error=>{
                                                                console.log(error)
                                                        })
    }
    else if (status.uid=='500'){
        axios.get(`http://localhost:3000/reversbooking/${status.uid}`)
        .then(response=>{
                console.log(response.data)
        })
      .catch(error=>{
                console.log(error)
        })
    }

    res.send(status)
})

// listen for requests
app.listen(3004, () => {
    console.log("Server is listening on port 3004");
});