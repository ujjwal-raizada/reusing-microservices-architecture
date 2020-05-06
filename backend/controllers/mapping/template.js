let TemplateModel = require("../../models/Template.js")
let TransformationModel = require("../../models/Transformation.js")

let TemplateController = {
    find: async (req, res) => {
        let found = await TemplateModel.find({name: req.params.name});
        res.json(found);
    },
    all: async (req, res) => {
        let allTemplates = await TemplateModel.find()
        res.json(allTemplates);
    },
    create: async (req, res) => {
        let newTemplate = new TemplateModel(req.body);
        let savedTemplate = await newTemplate.save();
        TransformationModel.findOneAndUpdate({"_id": newTemplate.transformation},{
            "$push": {"templates": newTemplate._id}
        },{new: true, safe: true, upsert: true }).then((result) => {
            return res.status(201).json({
                status: "Success",
                message: "Created Successfully",
                data: result
            });
        }).catch((error) => {
            return res.status(500).json({
                status: "Failed",
                message: "Database Error",
                data: error
            });
        });
    }
}

module.exports = TemplateController;

