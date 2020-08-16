const express = require('express');
const bodyParser = require('body-parser');
const axios=require('axios');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("It's working")
})
var uid=0;
// define a simple route
app.get('/:name/:emailid/:startdate', (req, res) => {
    uid=uid+1
    axios.get(`http://localhost:3001/${uid}/${req.params.name}/${req.params.emailid}/${req.params.startdate}`)
                                .then(response=>{
                                        console.log(uid)
                                        res.send({"status":"ok"})
                                })
                                .catch(error=>{
                                         console.log(error)    
                                         res.send({"status":"fail"})
                                        })
    
});

app.get('/reversbooking/:uid',(req,res)=>{
    console.log(req.params.uid)
    axios.get(`http://localhost:3001/reversebooking/${req.params.uid}`)
    .then(response=>{
            console.log(response.data)
            res.send(response.data)
    })
  .catch(error=>{
            console.log(error)
    })
})

app.get('/secondservice/:uid',(req,res)=>{
    console.log(req.params.uid)
    axios.get(`http://localhost:3002/timescheduling/${req.params.uid}`)
    .then(response=>{
            console.log(response.data)
            res.send({"status":"ok"})
    })
  .catch(error=>{
            console.log(error)
    })
    
})


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});