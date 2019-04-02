const express = require('express');
const router = express.Router();
const borderController = require('../controllers/border.js');

router.get('/',borderController.getAllBorder);
router.get('/:id',borderController.getBorderById);
router.post('/',borderController.getPostBorder);
router.put('/:id',borderController.updateBorder);
router.delete('/:id',borderController.deleteBorder);


module.exports = router;
