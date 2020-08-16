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
app.get('/:uid/:name/:emailid/:startdate', (req, res) => {
    var item={
    "uid":req.params.uid,
    "name":req.params.name,
    "emailid":req.params.emailid,
    "startdate":req.params.startdate}
    MongoClient.connect(dbConfig.url, function (err, db) {
        if (err){
            axios.get(`http://localhost:3004/firstservice/${item.uid}/500`)
            .then(response=>{
                    console.log(response.data)
            })
          .catch(error=>{
                    console.log(error)
            })
        }

        db.collection('user',(err,coln)=>{
            if (err){
                axios.get(`http://localhost:3004/firstservice/${item.uid}/500`)
                .then(response=>{
                        console.log(response.data)
                })
              .catch(error=>{
                        console.log(error)
                })
            }

            coln.insert(item,(err,data)=>{
                if (err){
                    axios.get(`http://localhost:3004/firstservice/${item.uid}/500`)
                    .then(response=>{
                            console.log(response.data)
                    })
                  .catch(error=>{
                            console.log(error)
                    })
                }
            
        axios.get(`http://localhost:3004/firstservice/${item.uid}/200`)
                                                        .then(response=>{
                                                                console.log(response.data)
                                                        })
                                                      .catch(error=>{
                                                                console.log(error)
                                                        })
            res.json(data)
            db.close();
        })
        })
    });               
});




app.get('/reversebooking/:uid', (req, res) => {
    var item={
    "uid":req.params.uid
    }
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