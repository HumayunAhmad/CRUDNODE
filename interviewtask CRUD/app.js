var express = require('express')
var app = express()
var ejs = require('ejs')
var morgan = require('morgan')
var model = require("./databases/models/models");
var model_relations = require("./databases/models/model_relations");
var bodyParser = require('body-parser')

app.set('view engine', 'hjs');

var serveIndex = require('serve-index')

app.set('view engine', 'ejs');


var cvRoutes = require("./api/routes/cv");

app.use(morgan("dev")); 
app.use(bodyParser.json({limit: 50 * 1024 *1024, extended: true}))
app.use(bodyParser.urlencoded({limit: 50 * 1024 *1024, extended: true}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization,Content-Length'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH')
    return res.status(200).json({})
  }
  next()
})

app.use("/cv", cvRoutes);




// //error handling
app.use((req, res, next) => {
  const error = new Error('not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status)
  res.json({
    error: {
      message: error.message,
      code: error.status,
    },
  })
})

module.exports = app
