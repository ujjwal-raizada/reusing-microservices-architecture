const express = require('express')
const router = express.Router()

const path = '../controllers/requested'

const getOne = require(path + '/get-one')
const getAll = require(path + '/get-all')
const add = require(path + '/add')

router.post("/one", getOne);
router.get("/all", getAll);
router.post("/add", add);

module.exports = router
