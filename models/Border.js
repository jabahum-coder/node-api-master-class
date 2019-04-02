const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Address = require('./Address');
const addressSchema = require('./Address');
const Joi = require('joi');


const borderSchema = new Schema({
  borderRoom:{
    type: Number,
    required: true,
    minlength:3,
    maxlength:3,
    trim: true
  },
  borderName:{
    type: String,
    required: true,
    trim: true
  },
  borderId:{
    type: Number,
    required: true,
    unique: true
  },
  borderDep:{
    type: String,
    required: true,
    uppercase: true,
    enum: ['CST','DNT','TCT']
  },
  cart:{
    balance:{type: Number,required: false,default: 0},
    mealOn: {type: Array},
    mealOff:{type:Array},
    mealRate:{type:Number},
    history: {type: Array}
  },
  borderEmail:{
    type: String,
    required: true,
    unique: true
  },
  borderPassword:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  date: {
    type: Date,
    default: Date.now
  },
  // address:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'address'
  // },
  // address:{
  //   type: addressSchema,
  //   required: true
  // }
});

const validateBorder = (border) => {
  const schema = {
    borderRoom: Joi.number().required(),
    borderName: Joi.string().min(3).max(100).required(),
    borderId: Joi.number().required(),
    borderDep: Joi.string().min(3).max(50).required(),
    borderEmail: Joi.string().min(5).max(200).required(),
    borderPassword: Joi.string().min(5).max(100).required()
  }
  return Joi.validate(border,schema);
}

const Border = mongoose.model('border',borderSchema);
module.exports = {
  Border,
  validateBorder
};
