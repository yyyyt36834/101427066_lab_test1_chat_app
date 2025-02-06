const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  password:{
    type: String
  },
  createon: {
    type: Date,
    default: Date.now
  },
});

//Declare Virtual Fields


//Custom Schema Methods
//1. Instance Method Declaration


//2. Static method declararion


//Writing Query Helpers



// EmployeeSchema.pre('save', (next) => {
//   console.log("Before Save")
//   let now = Date.now()
   
//   this.updatedat = now
//   // Set a value for createdAt only if it is null
//   if (!this.created) {
//     this.created = now
//   }
  
//   // Call the next function in the pre-save chain
//   next()
// });

// EmployeeSchema.pre('findOneAndUpdate', (next) => {
//   console.log("Before findOneAndUpdate")
//   let now = Date.now()
//   this.updatedat = now
//   console.log(this.updatedat)
//   next()
// });


// EmployeeSchema.post('init', (doc) => {
//   console.log('%s has been initialized from the db', doc._id);
// });

// EmployeeSchema.post('validate', (doc) => {
//   console.log('%s has been validated (but not saved yet)', doc._id);
// });

// EmployeeSchema.post('save', (doc) => {
//   console.log('%s has been saved', doc._id);
// });

// EmployeeSchema.post('remove', (doc) => {
//   console.log('%s has been removed', doc._id);
// });

const User = mongoose.model("User", UserSchema);
module.exports = User;