var con = require("./db/db");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const {limiter} = require('./middleware/middleware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/register", function (req, res) {
  let fullName = req.body.fullName;
  let email = req.body.email;
  let password = req.body.password;

  let sql = "INSERT INTO registration(fullName,email,password) VALUES(?,?,?)";

  con.query(sql, [fullName, email, password], function (err, result) {
    if (err) throw console.log(err);
    res.redirect("/success");
  });
});


app.post("/login",limiter ,function(req,res){
  let email = req.body.email
  let password = req.body.password
console.log('inside login')
  con.query("select * from registration where email = ? and password = ?",[email,password],function(eroor, results,fields){
    if(results.length>0){
      res.redirect("/dashboard")
    }else{
      res.redirect("/login")
    }
  });
})


app.get("/dashboard",function(req,res){
  res.sendFile(__dirname+"/public/dashboard.html")
})

app.get("/login",function(req,res){
  res.sendFile(__dirname+"/public/login.html")
})

app.get('/failed',function(req,res){
  res.sendFile(__dirname+"/public/failed.html")
})

app.get("/success",function(req,res){
  res.sendFile(__dirname+"/public/success.html")
})

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/public/register.html");
});

app.listen(3000);
