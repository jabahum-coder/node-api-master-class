require('express-async-errors');
const config = require('config');
const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const borderRoute = require('./routes/border');
const mongoose = require('mongoose');
const addressRouter = require('./routes/address');
const studentsRouter = require('./routes/students');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const error = require('./middleware/error');
if(!config.get('jwtPrivateKey')){
  console.log('Fatal error: jwtPrivateKey is not defined');
  process.exit(1);
}


mongoose.connect('mongodb://localhost:27017/hostel',{useNewUrlParser: true}).then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.log('Database Error: ',err.message);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
})


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/borders',borderRoute);
app.use('/api/address',addressRouter);
app.use('/api/students',studentsRouter);
app.use('/api/users',userRouter);
app.use('/api/login',authRouter);


app.use(error);
