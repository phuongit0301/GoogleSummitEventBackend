const express = require('express');
const router = express.Router();

const GroupController = require('../controllers/group-controller');


router.post('/', GroupController.createGroup);
router.put('/update/:id', GroupController.updateGroup);
router.get('/update-all', GroupController.updateAllGroup);
router.delete('/delete/:id', GroupController.deleteGroup);
router.get('/show/:id', GroupController.getGroupById);
router.get('/', GroupController.getGroups);

module.exports = router;