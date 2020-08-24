const express = require('express');
const bodyParser = require('body-parser');
const axios=require('axios');
const dbConfig = require('./database.config.js');
var MongoClient = require('mongodb').MongoClient;


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("It's working on 3003")
})
app.get('/namecheck/:uid',(req,res)=>{
    console.log(req.params.uid)
    MongoClient.connect(dbConfig.url, function (err, db) {
        db.collection('user',(err,coln)=>{
            coln.findOne({"uid":req.params.uid},(err,data)=>{
                if (data.name[0]=="A"){
                    axios.get(`http://localhost:3004/thirdservice/${req.params.uid}/200`)
                    .then(response=>{
                            console.log({"status":"pass with 200"})
                            res.send({"status":"pass with 200"})
                    })
                    .catch(error=>{
                            console.log(error)
                            res.send({"status":"fail"})
                    })
                }
                else{
                    axios.get(`http://localhost:3004/thirdservice/${req.params.uid}/500`)
                    .then(response=>{
                            console.log({"status":"pass with 500"})
                            res.send({"status":"pass with 500"})
                    })
                    .catch(error=>{
                            console.log(error)
                            res.send({"status":"fail"})
                    })
                }
                db.close()
            })
        })
    })
})

app.listen(3003, () => {
    console.log("Server is listening on port 3003");
});