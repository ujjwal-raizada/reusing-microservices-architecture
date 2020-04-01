const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RequestedMSSchema = new Schema({
    title : { 
        type : String,
        required : true,
        unique : true
    },
    params : [{
        type : String
    }]          
  });

var RequestedMSModel = mongoose.model("RequestedMS", RequestedMSSchema);

module.exports = RequestedMSModel;
