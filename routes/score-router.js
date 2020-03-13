const express = require('express')

const CommonController = require('../controllers/common-controller');

const router = express.Router()

router.get('/remove', CommonController.removeScore);
router.get('/get', CommonController.getScore);
router.delete('/removeById', CommonController.removeScoreById);

module.exports = router;