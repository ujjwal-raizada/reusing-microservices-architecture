const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    transformation: {
        type: Schema.Types.ObjectId,
        ref: "Transformation"
    }
});

var TemplateModel = mongoose.model("Template", TemplateSchema);

module.exports = TemplateModel; 
 