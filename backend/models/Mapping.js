const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MappingSchema = new Schema({
    requested: {
        type: String,
        required: true,
        unique: true
    },
    existing: [{ 
        type: String 
    }]
  });

var MappingModel = mongoose.model("Mapping", MappingSchema);

module.exports = MappingModel; 
