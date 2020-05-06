const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TransformationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    templates: [{ 
        type: Schema.Types.ObjectId,
        ref: "Template" 
    }],
});

var TransformationModel = mongoose.model("Transformation", TransformationSchema);

module.exports = TransformationModel; 
