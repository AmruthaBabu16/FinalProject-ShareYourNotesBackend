const express =require("express");
const NoteData=require('./src/model/NoteData');
const cors=require('cors');
const jwt=require("jsonwebtoken")
var bodyparser=require('body-parser');
const app =new express();
app.use(cors());
app.use(express.json())
app.use(bodyparser.json());
username='admin';
password='1234';

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  var token=req.headers.authorization.split(' ')[1]
  if(token=='null')
{
  return res.status(401).send('Unauthorized request');
}

let payload= jwt.verify(token,'secretKey');
console.log(payload);

if(!payload){
  return res.status(401).send('Umauthorized request');
}
req.userId=payload.subject;
next();


}
app.get('/notes',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE");
    NoteData.find()
    .then(function(notes){
        res.send(notes);
    })
});
app.get('/:id',function(req,res){
   const id=req.params.id;
   NoteData.findOne({'_id':id})
   .then((notes)=>{
     res.send(notes);
   })
})
app.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE");
    console.log(req.body);
    var note={
        TopicName:req.body.note.TopicName,
        Preview:req.body.note.Preview,
        Details:req.body.note.Details,
    }
    var note=new NoteData(note);;
     note.save();
})

  
  app.post('/login', (req, res) => {
      let userData = req.body  ;     
          if (!username) {
            res.status(401).send('Invalid Username');
          } else 
          if ( password !== userData.password) {
            res.status(401).send('Invalid Password');
          } else {
            let payload = {subject: username+password}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
          }
        
      })
  
      app.put('/update',(req,res)=>{
        console.log(req.body)
        id=req.body._id,
        TopicName=req.body.TopicName,
        Preview=req.body.Preview,
        Details=req.body.Details
      // req.body.starRating,
        // imageUrl = req.body.imageUrl
       NoteData.findByIdAndUpdate({"_id":id},
                                    {$set:{
                                    //     "productId":productId,
                                    // "productName":productName,
                                    // "productCode":productCode,
                                    // "releaseDate":releaseDate,
                                    // "description":description,
                                    // "price":price,
                                    // "starRating":starRating,
                                    // "imageUrl":imageUrl
                                   "TopicName":TopicName,
                                   "Preview":Preview,
                                   "Details":Details
                                }})
       .then(function(){
           res.send();
       })
     })
     
  app.delete('/remove/:id',(req,res)=>{
     
       id = req.params.id;
       NoteData.findByIdAndDelete({"_id":id})
       .then((notes)=>{
          
           res.send(notes);
       })
     })



app.listen(3000);

