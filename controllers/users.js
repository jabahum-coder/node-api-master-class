const {User,userValidation} = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const getUser = async (req,res,next) => {
  const user = await User.find();
  if(!user) res.status(500).send('Error Occured in getUser');
  res.send({
    message: 'All User data',
    user
  });

  // User.find().then(data => {
  //   res.send(data)
  // })
}


const getSingleUser = async (req,res,next) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);

}

const postUser = async (req,res,next) => {
  const {error} = await userValidation(req.body);
  if(error) res.status(400).send(error.details[0].message);
  const email = await User.findOne({email: req.body.email});
  if(email) res.status(400).send('This email already exist. Please try to another mail ');
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);

  const result = await user.save();
  if(!result) res.status(500).send('Error Occured in PostUser');

  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send({user: result});
}


const updateUser = async (req,res,next) => {
  const {error} = await userValidation(req.body);
  if(error) res.status(500).send(error.details[0].message);
  const user = await User.findOneAndUpdate({_id: req.params.id},{
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    }
  });

  if(!user) res.status(500).send('Error Occured in update User');
  res.send({
    message: 'Updated user data',
    user
  })
}

const deleteUser = async (req,res,next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) res.status(500).send('error occured in deleteUser');
  res.send({
    message: 'deleted user data',
    user
  })
}

module.exports = {
  getUser,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser
}
