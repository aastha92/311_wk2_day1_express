
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const port = process.env.PORT || 4000

app.use(bodyParser.json()); 


const { users } = require('./state')
let counter = users.length;
let userList = users;


/* BEGIN - create routes here */

//-----------------------------------------------------------get List of users---------------------------------------
app.get('/users', (req,res)=>{res.json(userList);})

//------------------------------------------------------------get single user-------------------------------------------

app.get('/users/:userId', (req,res)=>{
  const usersObj = userList.find(userList => userList._id == req.params.userId);
    res.json(usersObj);
})

//----------------------------------------------------------------create new user-------------------------------------------
app.post('/users', (req,res)=>{
  counter++;
  const newUser = {
    "_id": counter,
    "name": req.body.name,
    "occupation": req.body.occupation,
    "avatar": req.body.avatar
  };
  userList.push(newUser);
  res.json(userList);
}) 

//---------------------------------------------------------------update the user------------------------------------
app.put('/users/:userId', (req,res) => {
  userList[userList.find(user => user._id == req.params.userId)].name = req.body.name;
  userList[userList.find(user => user._id == req.params.userId)].occupation = req.body.occupation;
  userList[ususerListers.find(user => user._id == req.params.userId)].avatar = req.body.avatar;
  res.send(userList[userList.find(user => user._id == req.params.userId)])
})

//--------------------------------------------------------------delete-----------------------------------------------------
app.delete('/users/:userId',(req,res)=>{
  userList = userList.filter(user => user._id != req.params.userId);
  res.send('deleted');
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))