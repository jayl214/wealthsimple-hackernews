const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const grabity = require("grabity");


// Set up the express app
const app = express();

//set root directory for static files
app.use(express.static('public'));

//set view engine to ejs
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, './views'));

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

// Default catchall that reroutes back to home
app.get('/', (req, res) => {
  res.render('index')
})

app.get( '/show/stories' , (req,res) => {
  let output
  (async () => {
    let it = await grabity.grabIt(req.query.url);
    output = {
      image: it.image,
      blurb: it.description,
    }
    res.json(JSON.stringify(output))
  })();

})

app.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = app;
