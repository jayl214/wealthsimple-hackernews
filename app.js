const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

app.get( '/show/posts' , (req,res) => {

})

module.exports = app;
