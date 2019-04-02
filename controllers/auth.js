const {User} = require('../models/Users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const getAuth = async (req,res,next) => {
  const {error} = userValidation(req.body);
  if(error) res.status(400).send(error);

  const user = await User.findOne({email: req.body.email});
  if(!user) res.status(400).send("Invalid email or password");
  const validatePass = await bcrypt.compare(req.body.password,user.password);
  if(!validatePass) res.status(400).send("Invalid email or password.");
  const token = user.generateAuthToken();
  res.send(token);
}




const userValidation = (user) => {
  return Joi.validate(user,{
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required()
  });
}


module.exports = getAuth;
