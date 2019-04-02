const mongoose = require('mongoose');
const Joi = require('joi');
const {addressSchema} = require('./Address')
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  roll: {
    type: String,
    required: true,
    minlength:2
  },
  department: {
    type: String,
    required: true,
    minlength: 3,
  },
  semester: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
  }
})

const studentValidation = (student) => {
  const schema = {
    name: Joi.string().min(3).max(55).required(),
    roll: Joi.number().min(3).max(10).required(),
    department: Joi.string().min(3).max(55).required(),
    semester: Joi.string().min(3).max(55).required(),
    shift: Joi.string().min(3).max(55).required(),
  }
}

const Students = mongoose.model('students',studentSchema);
module.exports = Students;
