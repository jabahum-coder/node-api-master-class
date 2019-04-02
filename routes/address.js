const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const addressController = require('../controllers/address');
router.get('/',addressController.getAddress);
router.post('/',auth,addressController.createAddress);
router.get('/:id',addressController.getSingleAddress);
router.put('/:id',addressController.updateAddress);
router.delete('/:id',[auth,admin],addressController.deleteAddress);

module.exports = router;
