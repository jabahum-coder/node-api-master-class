const mongoose = require('mongoose');
const Joi = require('joi');
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 30
  },
  district:{
    type: String,
    require: true,
    minlength:3
  },
  subDistrict: {
    type: String,
    require: true,
    minlength: 3
  },
  postOffice: {
    type: String,
    require: true,
    minlength: 3
  },
  village: {
    type: String,
    require: true,
    minlength: 3
  }
});

const validateAddress = (address) => {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    district:Joi.string().min(3).max(25).required(),
    subDistrict: Joi.string().min(3).max(25).required(),
    postOffice: Joi.string().min(3).max(20).required(),
    village: Joi.string().min(3).max(20).required(),
  }

  return Joi.validate();
}


const Address = mongoose.model('address',addressSchema);
module.exports = {
  Address,
  addressSchema,
  validateAddress
};
