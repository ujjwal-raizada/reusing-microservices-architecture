const express = require('express')
const router = express.Router()

const path = '../controllers/mapping'
const getAllController = require(path + '/get-all')
const getTemplatesController = require(path + '/get-templates')
const getMappingController = require(path + '/get-mapping')
const updateMappingController = require(path + '/update-mapping')
const TemplateController = require(path + '/template')
const TransformationController = require(path + '/transformation')

router.get('/all', getAllController)
router.get('/templates', getTemplatesController)
router.post('/get', getMappingController)
router.post('/update', updateMappingController)

router.get('/transformations/all', TransformationController.all);
router.get('/transformations/find/:name', TransformationController.find);
router.get('/transformations/:name/templates', TransformationController.getAllTemplates);
router.post('/transformations/create', TransformationController.create)

router.get('/templates/all', TemplateController.all);
router.get('/templates/find/:name', TemplateController.find);
router.post('/templates/create', TemplateController.create)

module.exports = router
