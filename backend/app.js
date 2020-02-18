const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const UserModel = require('./model/User');

mongo_db = "mongodb+srv://microservice-framework:Gc38w7Kb2KQxt9L@microcluster-faujq.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongo_db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(cors())
app.use(express.json());
app.use( bodyParser.urlencoded({ extended : false }) );

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-route');
const microserviceRouter = require('./routes/microservice')
const mappingRouter = require('./routes/mapping')


app.use('/mapping', mappingRouter)
app.use('/', routes);
app.use('/microservice', microserviceRouter)
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(8080, () => {
  console.log('Server started')
});
