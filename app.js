const express=require('express')
const fs=require('fs')
const path=require('path')
const mongoose = require('mongoose')
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=80
const app=express()

const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    gender:String,
    address:String,
    query:String

  });

const Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))


app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item have been save in the database")
    }).catch(()=>{
        res.send("Item was not save to the database")
    })
    //res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
