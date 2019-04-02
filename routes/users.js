const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getUser,getSingleUser,postUser,updateUser,deleteUser} = require('../controllers/users');
router.get('/',getUser);
router.get('/me',auth,getSingleUser);
router.post('/',postUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;
