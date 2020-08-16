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

// define a simple route
app.get('/',(req,res)=>{
    res.send("<h1>yo you<h1> ")
}) 
//inserting document in collection.


app.get('/timescheduling/:uid', (req, res) => {
    var item={
    "uid":req.params.uid
    }
    MongoClient.connect(dbConfig.url, function (err, db) {
        
        db.collection('user',(err,coln)=>{
            coln.findOne(item,(err,data)=>{
            if (err) throw err;
            console.log(data.startdate)
            res.json(data.startdate)
            db.close();
        })
        })
    });               
});





// listen for requests
app.listen(3002, () => {
    console.log("Server is listening on port 3002");

});