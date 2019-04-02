const Students = require('../models/Students');
const {Address} = require('../models/Address');
const getAllStudents = async (req,res,next) => {
  const students = await Students.find().populate('address','name district -_id');
  if(!students) res.status(505).send('Error Occured in getAllStudents');
  res.send({
    message: "All students",
    students
  });
}


const getSingleStudents = async (req,res,next) => {
  const student = await Students.findById(req.params.id);
  if(!student) res.status(505).send('Error Occured in getSingleStudents');
  res.send({
    message: 'Single Student',
    student
  })
}

const postStudents = async (req,res,next) => {
  const student = new Students({
    name: req.body.name,
    roll: req.body.roll,
    department: req.body.department,
    semester: req.body.semester,
    shift: req.body.shift,
    address: req.body.address 
  })
  const result = await student.save();
  if(!result) res.send(505).send('Error Occured in postStudents');
  res.send({
    message: 'Added One Student',
    student: result
  })
}

const updateStudents = async (req,res,next) => {
  const student = await Students.update({_id:req.params.id},{
    $set:{
      name: req.body.name,
      roll: req.body.roll,
      department: req.body.department,
      semester: req.body.semester,
      shift: req.body.shift
    }
  })

  if(!student) res.status(505).send('Error Occured in updateStudents');
  res.send({
    message: 'Student updated successfully',
    student
  })

}

const deleteStudens = async (req,res,next) => {
  const student = await Students.findByIdAndDelete(req.params.id);
  if(!student) res.status(505).send('Error Occured in deleteStudens');
  res.send({
    message: 'Deleted student successfully',
    student
  })
}

module.exports = {
  getAllStudents,
  getSingleStudents,
  postStudents,
  updateStudents,
  deleteStudens
}
