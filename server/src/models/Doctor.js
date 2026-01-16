const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select : false
  },
  department: {
    type: String,
    required: true,
    enum: ["Cardiology", "Neurology", "Orthopedics", "General", "Pediatrics", "Dermatology", "Psychiatry", "Gynecology", "Oncology", "Radiology", "Urology", "ENT", "Ophthalmology", "Other"]

  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: Number,
    default: 0,
  },
  fees: {
    type: Number,
    default: 0,
  },
  location : {
    type : String
  },
  age : {
    type : Number
  },
  
   profilePicture : {
        type : String
    },
    gender : {
      type : String,
      enum : ['male' , 'female' , 'other']
    },
    clinicName: { type: String }

},{timestamps: true});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
