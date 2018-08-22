const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const grabity = require("grabity");

const app = express();

//set root directory for static files to public folder
app.use(express.static('public'));


app.set('view engine', 'ejs')

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.get('/', (req, res) => {
  res.render('index')
})

//for getting individual story metaData
app.get( '/show/stories' , (req,res) => {
  let output
  (async () => {
    let it = await grabity.grabIt(req.query.url);
    //structure output into object, send image url and blurb
    output = {
      image: it.image,
      blurb: it.description,
    }
    res.json(JSON.stringify(output))
  })();

})

// Default catchall that reroutes back to home
app.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = app;
