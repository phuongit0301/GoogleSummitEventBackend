const express = require('express')

const CommonController = require('../controllers/common-controller');

const router = express.Router()

router.post('/create', CommonController.createExcel);
router.get('/createSlide', CommonController.createSlide);

module.exports = router;