// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////
var availableTables = [
    {
    routeName: "availableTables",
    customerEmail: "yoda@yahoo.com",
    name: "Yoda",
    phoneNumber: "555-555-5555",
    customerID: 'phone'
    }
]; 
////////////////////////////////

var waitingList = [
    {
        routeName: "waitingList",
        customerEmail: "darthMaulin@gmail.com",
        name: "Darth Maul",
        phoneNumber: "555-555-5556",
        customerID: '1231551'
    }
]; 
//////////////////////////////////



//name of waiting person, UID, phone, date of res, email
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
app.get("/api/tables/:table", function(req, res) {
    if(req.params.table==="reserved"){
        res.json(availableTables)
    }
    else if(req.params.table==="waitlist"){
        res.json(waitingList)
    }
});

app.get("/api/:table", function(req, res) {
    var chosen = req.params.table;
  
    console.log(chosen);
    if(chosen == "tables")
    {
     return res.json(availableTables);
         // for (var i = 0; i < availableTables.length; i++) {
         //      return res.json(availableTables);
         //         }
         // return res.json(false);
     }
     else  if(chosen == "waitlist")
     {
         return res.json(waitingList);
         // for (var i = 0; i < waitingList.length; i++) {
         //      return res.json(waitingList[i]);
         //        }
         // return res.json(false);
     }
     return res.json(false);
});
// Create New reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;

  
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    // need a way of checking if there are 
    // 5 tables full 
    availableTables.push(newReservation);
  
    res.json(newReservation);
  });
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });