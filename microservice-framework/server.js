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
let batchSize = config.default.get('batchSize');
let postBatch = [];
let getBatch = [];

// logging function
router.use(function(req, res, next) {
    console.log('Received request: ' + JSON.stringify(req.body));
    next();
});

router.get(getRoute, function(req, res) {
    var data = handleGetBatch()
    console.log(data)
    if(data) {
        res.json(data)
    } else {
        axios.get(hostURL + getRoute)
        .then(response => {
            getBatch = response.data
            data = handleGetBatch()
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.send("Error")
        })  
    }      
});

router.post(postRoute, function(req, res) {
    var data = transformations.transform(req.body)
    data = handlePostBatch(data)
    if(data) {
        axios.post(hostURL + postRoute, data)
        .then(response => {
            batch = []
            res.json(response.data)
        })
        .catch(err => {
            console.log(err)
            batch.pop()
            res.send("Error")
        })
    } else {
        res.send("Request logged")
    }
});

handleGetBatch = () => {
    if(getBatch.length) {
        return getBatch.pop()
    } else {
        return null
    }
}

handlePostBatch = (data) => {
    postBatch.push(data)
    if(postBatch.length === batchSize) {
        return postBatch
    } else {
        return null
    }
}


app.use('/', router);
app.listen(port);

console.log("Server listening at port: " + port);
