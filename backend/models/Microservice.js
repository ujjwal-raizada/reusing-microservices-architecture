const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MicroserviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    keywords: [{
        type: String
    }],
    developer: {
        type: String,
        required: false
    },  
    documentation: {
        type: String
    },
    codeSnippet: {
        type: String
    },
    techStack: [{
        type: String
    }],
    params: [{
        type: String
    }],
    url: {
        type: String,
        required: true,
        unique: true
    },
    getRoute: {
        type: String,
        required: true,
        unique: true
    },
    postRoute: {
        type: String,
        required: true,
        unique: true
    },
    batchSize: {
        type: Number,
        required: true,
        unique: true
    }
});

var MicroserviceModel = mongoose.model("Microservice", MicroserviceSchema);

module.exports = MicroserviceModel;
