const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = "mongodb+srv://prakhar:prakhar@login-page-bqjzb.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "process.env.MONGODB_URI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(cors())
app.use(express.json());
app.use( bodyParser.urlencoded({ extended : false }) );

const newRoutes = require("./routes/api");
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-route');
const microserviceRouter = require('./routes/microservice')
const mappingRouter = require('./routes/mapping')

app.use("/api", newRoutes);
app.use('/mapping', mappingRouter)
app.use('/', routes);
app.use('/microservice', microserviceRouter)
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(PORT, () => {
  console.log('Server started at port number: ' + PORT)
});
