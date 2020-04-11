let axios = require("axios");
let config = require("react-global-configuration");
let body_parser = require('body-parser');
let express = require('express');

let transformations = require('./transformations');
let configuration =  require("./config");

config.default.set(configuration);
let app = express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

let port = process.env.PORT || config.default.get('port');
let router = express.Router();

let getRoute = config.default.get('routes.get');
let postRoute = config.default.get('routes.post');
let hostURL = config.default.get('host');

// logging function
router.use(function(req, res, next) {
    console.log('Received request: ' + JSON.stringify(req.body));
    next();
});

router.get(getRoute, function(req, res) {
    axios.get(hostURL + getRoute)
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.log(err)
        res.send("Error")
    })    
});

router.post(postRoute, function(req, res) {
    var data = transformations.transform(req.body)
    axios.post(hostURL + postRoute, data)
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.log(err)
        res.send("Error")
    })
});

app.use('/', router);
app.listen(port);

console.log("Server listening at port: " + port);
