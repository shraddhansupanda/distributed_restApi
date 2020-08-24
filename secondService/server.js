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
app.get('/lan/:uid',(req,res)=>{
    var item={
        "uid":req.params.uid
    }
    MongoClient.connect(dbConfig.url, function (err, db) {
        db.collection('user',(err,coln)=>{
            var number;
        coln.findOne(item,(err,data)=>{
            if (err){
                console.log(err)
            }

            var number=Number(new Date(data.startdate))
            res.send({"status":"send"})
            console.log(data.startdate)
        })
    })
    })
})

app.get('/timescheduling/:uid', (req, res) => {
    var item={
    "uid":req.params.uid
    }

    
    MongoClient.connect(dbConfig.url, function (err, db) {
        
        // db.collection('user',(err,coln)=>{
        //     coln.findOne(item,(err,data)=>{
        //     if (err) throw err;
        //     console.log(data.startdate)
        //     res.json(data.startdate)
        //     db.close();
        // })
        // })
        db.collection('user',(err,coln)=>{
            var number;


        coln.findOne(item,(err,data)=>{
            if (err){
                console.log(err)
            }
            number=Number(new Date(data.startdate))
        })


        coln.find((err,data)=>{
            if (err){
                console.log(err)
            }
            var count=0;
            data.forEach(element => {
                // console.log(element)
                if ((Number(new Date(element.startdate)))==number){
                    count=count+1
                    console.log(count)
                    if (count==2){
                        console.log(litem)
                            axios.get(`http://localhost:3004/secondservice/${req.params.uid}/500`)
                                    .then(response=>{
                                            console.log({"status":'pass with 500'})
                                            res.send({"status":"fail"})
                                            
                                    })
                                    .catch(error=>{
                                                console.log(error)
                })
                    }
                    // console.log(number)
                    // console.log(count)
                }
                // console.log(Number(new Date(element.startdate)))
            });


            axios.get(`http://localhost:3004/secondservice/${req.params.uid}/200`)
                            .then(response=>{
                                    console.log({"status":"pass with 200"})
                                    res.send({"status":"pass"})
                            })
                            .catch(error=>{
                                        console.log(error)
        })   
            // res.json(data.startdate)
            db.close();
        })

    });
    });               
});





// listen for requests
app.listen(3002, () => {
    console.log("Server is listening on port 3002");

});