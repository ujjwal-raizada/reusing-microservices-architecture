const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RequestedMSSchema = new Schema({
    title : { 
        type : String,
        required : true,
        unique : true
    },  
    description : { 
        type : String
    },
    params : [{ 
        type : String 
    }],
    url : {
        type : String,
        required : true,
        unique : true
    },
    getRoute : {
        type : String,
        required : true,
        unique : true
    },
    postRoute : {
        type : String,
        required : true,
        unique : true
    },
    batchSize: {
        type : Number,
        required : true,
        unique : true
    }, 
  });

var RequestedMSModel = mongoose.model("RequestedMS", RequestedMSSchema);

module.exports = RequestedMSModel;
