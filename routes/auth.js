const express = require('express');
const router = express.Router();
const getAuth = require('../controllers/auth');
router.post('/',getAuth);

module.exports = router;
