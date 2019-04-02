const {Border, validateBorder} = require('../models/Border');




const getAllBorder = (req,res,next) => {
  Border.find().populate('address','name -_id district').select('borderName address borderEmail borderPassword')
  .then((border) => {
    res.status(200).json({
      message: 'All Border Data',
      border
    }).catch(err => {
      res.status(500).json({
        message: 'Error Found',
        Error: err.message
      })
    })
  })
}

const getBorderById = (req,res,next) => {
  const id = req.params.id;
  Border.findOne({_id:id}).then((border) => {
    res.status(200).json({
      message: 'Single Border Data',
      border
    })
  }).catch(err => {
    res.status(500).json({
      message:'Error Occured',
      Error: err.message
    })
  })
}

const getPostBorder = (req,res,next) => {
  const { error } = validateBorder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const border = {
    borderRoom: req.body.borderRoom,
    borderName: req.body.borderName,
    borderId: req.body.borderId,
    borderDep: req.body.borderDep,
    borderEmail: req.body.borderEmail,
    borderPassword: req.body.borderPassword,
    cart:{
      totalBalance: 0,
      isMealOn: false,
      needToCart: 0,
      history: []
    },
    // address: req.body.address
  }

  const result = new Border(border);

  result.save().then((border) => {
    res.status(201).json({
      message: 'New border Added',
      border
    })
  }).catch(err => {
    res.status(500).json({
      message:'Error Occured',
      Error: err.message

    })
  })
}

const updateBorder = (req,res,next) => {
  const { error } = validateBorder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const border = {
    borderRoom: req.body.borderRoom,
    borderName: req.body.borderName,
    borderId: req.body.borderId,
    borderDep: req.body.borderDep,
    borderEmail: req.body.borderEmail,
    borderPassword: req.body.borderPassword,
    cart:{
      balance: req.body.cart.balance,
      mealOn: req.body.cart.mealOn,
      mealOff: req.body.cart.mealOff,
      mealRate: req.body.cart.mealRate,
      history: req.body.cart.history
    },
    // address: {
    //   name: req.body.address.name,
    //   district: req.body.address.district
    // }
  }
  const id = req.params.id;

  const result = Border.findByIdAndUpdate(id,{
    $set: border
  })
  .then(border => {
    Border.findById(border._id).then(lb => {
      res.json({
        message: "border data updated successfully",
        border: lb
      })
    })
  }).catch(err => {
    res.status(500).json({
      message: "Error Occured in the update section",
      Error: err.message
    })
  })

}

const deleteBorder = (req,res,next) => {
  const id = req.params.id;
  const border = Border.findByIdAndDelete(id);
  border.then(border => {
    res.json({
      message: "Delete border successfully",
      border
    })
  }).catch(err => {
    res.status(500).json({
      message: 'Error Occured',
      Error: err.message
    })
  })
}




module.exports = {
  getAllBorder,
  getBorderById,
  getPostBorder,
  updateBorder,
  deleteBorder
}
