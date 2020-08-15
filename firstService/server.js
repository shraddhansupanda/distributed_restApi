const express = require('express');
const bodyParser = require('body-parser');
const axios=require('axios');
const { response } = require('express');
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
app.get('/:uid/:name/:emailid/:startdate', (req, res) => {
    var item={
    "uid":req.params.uid,
    "name":req.params.name,
    "emailid":req.params.emailid,
    "startdate":req.params.startdate}

    MongoClient.connect(dbConfig.url, function (err, db) {
        
        db.collection('user',(err,coln)=>{
            coln.insert(item,(err,data)=>{
            if (err) throw err;
            res.json(data)
            db.close();
        })
        })
    });               
});
app.get('/:remove/:uid', (req, res) => {
    var item={
    "uid":req.params.uid
    }
    console.log(req.params.uid)
    MongoClient.connect(dbConfig.url, function (err, db) {
        
        db.collection('user',(err,coln)=>{
            coln.remove(item,(err,data)=>{
            if (err) throw err;
            res.json(data)
            db.close();
        })
        })
    });               
});




app.get('/count',(req,res)=>{
    MongoClient.connect(dbConfig.url, function (err, db) {
        db.collection('user',(err,coln)=>{
            coln.count((err,data)=>{
                if (err) throw err;
                res.json(data)
                db.close();

            })
        })
    })
})


// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});