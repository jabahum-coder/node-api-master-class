const {Address,validateAddress} = require('../models/Address');
/* const asyncMiddleware = require('../middleware/async');
  note that:  optional to express-async-errors */

// Post Section
const createAddress = async (req,res) => {
  const {error} = validateAddress(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let address = new Address({
    name: req.body.name,
    district: req.body.district,
    subDistrict: req.body.subDistrict,
    postOffice: req.body.postOffice,
    village: req.body.village
  })
  address = await address.save();
  if(!address) return res.status(400).send('Somthing wrong');
  res.send(address);
};

const getAddress = async (req,res,next) => {
  const addresses = await Address.find();
  if(!addresses) res.status(404).send('Error Occured in getAddress');
  res.send(addresses);
}


// Get Section
const getSingleAddress = async (req,res,next) => {
  const address = await Address.findById(req.params.id);
  if(!address) res.status(505).send('Error Occured in getSingleAddress');
  res.send({
    message: 'Single Address',
    address
  })
};

const updateAddress = async (req,res,next) => {
  const {error} = validateAddress(req.body);
  if(error) res.status(505).send(error.details[0].message);
  const address = await Address.update(req.params.id,{
    $set:{
      name: req.body.name,
      district: req.body.district,
      subDistrict: req.body.subDistrict,
      postOffice: req.body.postOffice,
      village: req.body.village
    }
  })

  if(!address) res.status(505).send('Error Occured in update Address');
  res.send({
    message: 'Updated successfully',
    address
  })

}

const deleteAddress = async (req,res,next) => {
  const address = await Address.findByIdAndDelete(req.params.id);
  if(!address) res.status(505).send('Error Occured in deleteAddress');
  res.send({
    message: 'Address deleted successfully',
    address
  })
}

module.exports = {
  createAddress,
  getAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress
}
