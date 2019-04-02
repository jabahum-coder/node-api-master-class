const express  = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/',studentsController.getAllStudents);
router.get('/:id',studentsController.getSingleStudents);
router.post('/',studentsController.postStudents);
router.put('/:id',studentsController.updateStudents);
router.delete('/:id',studentsController.deleteStudens);


module.exports = router;
