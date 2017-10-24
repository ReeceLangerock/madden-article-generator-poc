// SETUP
var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var port = process.env.PORT || 3001
var app = express()

var bodyParser = require('body-parser')
app.use(
  bodyParser.json({
    limit: '50mb'
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var mongoUser = process.env.DB_USERNAME
var mongoPass = process.env.DB_PASSWORD
if (process.env.NODE_ENV !== 'production') {
  var config = require('./config.js')
  mongoUser = config.getMongoUser()
  mongoPass = config.getMongoPass()
}

mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@ds125555.mlab.com:25555/madden-article-generator`)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection eror:'))
db.once('open', function () {
  console.log('connected')
})

// EXPRESS SETUP
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')

/* app.use(flash());
app.use(function(req, res, next){
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
}); */

// ROUTES
// app.use('/', require('./controllers/index'));
// app.use('/standings', require('./controllers/standings'));
// app.use('/schedules', require('./controllers/schedules'));
// app.use('/recap', require('./controllers/gamerecap'));
app.use('/import', require('./controllers/import'))
app.use('/calculate', require('./controllers/calculate'))

/* app.use(function (req, res, next) {
  res.status(404).render('404');
}) */

// launch
app.listen(port, function () {
  console.log(`Revo-GM listening on port ${port}!`)
})
