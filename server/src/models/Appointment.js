const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctor',
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['pending' , 'approved' , 'rejected'],
        default : 'pending'
    },
     remarks: {
      type: String,
      default: "",
    },
}, {timestamps : true})


const Appointment = mongoose.model('Appointment' , appointmentSchema)

module.exports = Appointment