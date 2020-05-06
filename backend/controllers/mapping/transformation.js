let TransformationModel = require("../../models/Transformation.js")

let TransformationController = {
    find: async (req, res) => {
        let found = await TransformationModel.find({name: req.params.name});
        res.json(found);
    },
    all: async (req, res) => {
        let allTransformations = await TransformationModel.find()
        res.json(allTransformations);
    },
    create: async (req, res) => {
        let newTransformation = new TransformationModel(req.body);
        let savedTransformation = await newTransformation.save();
        res.json(savedTransformation);
    },
    getAllTemplates: async (req, res) => {
        let templates = await TransformationModel.find({name: req.params.name}).populate("templates");
        res.json(templates)
    }
}

module.exports = TransformationController;

