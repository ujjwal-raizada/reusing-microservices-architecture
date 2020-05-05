const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RequestedMicroserviceSchema = new Schema({
    title: { 
        type: String,
        required: true,
        unique: true
    },  
    description: {
        type: String
    },
    params: [{
        type: String
    }],
    url: {
        type: String,
        required: true,
    },
    getRoute: {
        type: String,
        required: true,
    },
    postRoute: {
        type: String,
        required: true,
    },
    batchSize: {
        type: Number,
        required: true,
    }
});

var RequestedMicroserviceModel = mongoose.model("RequestedMS", RequestedMicroserviceSchema);

module.exports = RequestedMicroserviceModel;
