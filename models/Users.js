const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
})
userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
  return token;
}
const User = mongoose.model('users',userSchema);
const userValidation = (user) => {
  return Joi.validate(user,{
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean()
  });
}
module.exports = {
  User,
  userValidation
};
