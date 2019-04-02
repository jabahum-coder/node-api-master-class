/* index.js */
const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser: true}).then(()=>{
  console.log('connection established....');
})
const courseSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    // lowercase: true,
    uppercase: true,
    trim: true,
    // get: v => something,
    // set: v=> something
    // match: /pattern/
  },
  category:{
    type: String,
    required: true,
    enum: ['web','mobile','network'],
    lowercase: true
  },
  author: String,
  // tags: {
  //   type: Array,
  //   validate: {
  //     validator: function (v) {
  //       return  v && v.length > 0;
  //     },
  //     message: 'A course should have at least one tag'
  //   }
  // },
  tags: {

    type: Array,
    validate: {
      isAsync: true,
      validator: function (v,callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        },4000)
      },
      message: 'A course should have at least one tag'
    }
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function (){return this.isPublished},
    get: v => Math.round(v),
    set: v=> Math.round(v)
  }
});

const Course = mongoose.model('Course',courseSchema);

// const createCourse =new Course({
//   name: 'Node js and express',
//   author: 'Faisal',
//   tags:['node','js','mongo','express'],
//   isPublished: true,
//   price: 13
// });

// createCourse.save()
// .then(data => {
//   console.log(data);
// })
// .catch(err => console.log('Error:',err.message))

const createCourse = async () => {
  const course = new Course({
    name: 'PHP 7 version',
    category: 'WEB',
    author: 'Faisal',
    tags:['php'],
    isPublished: true,
    price: 20.67
  })

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for(field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }

  // course.save().then(data => {
  //   console.log(data);
  // }).catch(err => console.log(err.message))
}




const getCourses = async ()=> {
  const Courses =   await Course
      .find()
      // .or([{tags: 'frontend'},{tags: 'backend'}])
      // .and([{tags: 'node'},{tags: 'backend'}])
      // .or([
      //   {price: {$gte: 15}},
      //   {name: /^.*by.*/i}
      // ])
      // .select('name author price')
      .sort('price')
      // .limit(3)

      console.log(Courses);
}
// getCourses();

// async function run(){
//   const course = await getCourses();
//   console.log(course);
// }
// run();



// async function updateCourse(id){
//   const course = await Course.findById(id);
//   if(!course) console.log('not found');
//   // course.isPublished = true;
//   // course.author = 'Another Author';
//
//   const result = await course.save();
//   console.log(result);
// }
//
//
// updateCourse('5a68fdd7bee8ea64649c2777');


const updateCourse = async (id) => {
  // const query = {_id:parseInt(id)}
  //findByIdAndUpdate
  //updateOne
  const query = {_id:id}
  const value = {
    name: 'Javascript course',
    price: 200,
    author: 'Faisal',
    isPublished: false,
    tags: ['node','frontend'],
    date: {type: Date,default: Date.now()}
  }
  const result = await Course.findOneAndUpdate(query,value,{new: true})
  console.log(result);
}
const removeCourse = async (id) =>{
  //deleteOne
  //deleteMany
  //findByIdAndDelete
  // const result = await Course.findByIdAndDelete({_id: id});
  const result = await Course.deleteMany({author: id});
  console.log(result);
}

createCourse();
// getCourses();
// removeCourse('Faisal');
// updateCourse('5a68fe2142ae6a6482c4c9cb');

/* home.js */


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground',{useNewUrlParser: true})
    .then(()=> console.log('connected t0 mongodb...'))
    .catch(err => console.log(err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  data: {type: Date,default: Date.now},
  isPublished: Boolean
})

const Course = mongoose.model('Course',courseSchema)

const createCourse = async () => {
  const course = new Course({
    name: 'Node.js Course',
    author: 'MOsh',
    tags: ['node','backend'],
    isPublished: true
  })

  //const result = await course.save();
  //console.log(result);
}

async function getCourse(){
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //in
  //nin (not in)


  const courses = await Course
  //.find({name: 'Node.js Course',isPublished: true})
  // .find({price: {$gte: 10,$lte:20}})
  //.find({price: {$in: [10,15,20]}})
  //.find()
  //.or([{author: 'MOsh'},{isPublished: false }])
  //.and([{author: 'MOsh'},{isPublished: false}])
  // .find({name: /^NODE/i})
  // .find({author: /^.*sh.*/i})
  // .find({name: /^.*Cour.*/i})
  // .limit(3)
  .find()
  .sort({name:1})
  // .skip((2-1) *3)
  .limit(4)
  // .count()
  .select({author: 1})
  console.log(courses);
}

getCourse();
createCourse();
