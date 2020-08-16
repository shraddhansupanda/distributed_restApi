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
            if (err) throw err;
            number=Number(new date(data.startdate))
        })
        coln.find((err,data)=>{
            if (err) throw err;
            data.forEach(element => {
                
                if ((Number(new Date(element.startdate)))==number){
                    axios.get(`http://localhost:3004/secondservice/${req.params.uid}/500`)
                            .then(response=>{
                                    console.log(response.data)
                                    res.send({"status":"fail"})
                            })
                            .catch(error=>{
                                        console.log(error)
        })
                }
                console.log(Number(new Date(element.startdate)))
            });
            axios.get(`http://localhost:3004/secondservice/${req.params.uid}/200`)
                            .then(response=>{
                                    console.log(response.data)
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