let TemplateModel = require("../../models/Template.js")

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
        res.json(savedTemplate);
    }
}

module.exports = TemplateController;

