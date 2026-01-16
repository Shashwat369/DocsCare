process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./src/config/db')
const cors = require('cors')
const userRoutes = require('./src/routes/userRoutes')
const doctorRoutes = require('./src/routes/doctorRoutes')
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const adminRoutes = require('./src/routes/adminRoutes')
const passwordRoutes = require("./src/routes/passwordRoutes")
const availabilityRoutes = require("./src/routes/availabilityRoutes")

const app = express()
const port = process.env.PORT || 8080
connectDB()

// middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false }))

// Routes
app.get("/", (req, res) => {
  res.send("🚀 DocsCare API is running successfully!");
});

app.use('/api/user' , userRoutes)
app.use('/api/doctor' , doctorRoutes)
app.use('/api/admin', adminRoutes);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/availability", availabilityRoutes);

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS?.length);


// listening
app.listen(port , ()=>{
    console.log(`Server is listening in ${process.env.NODE_ENV} mode on port ${port}`.bgMagenta.white)
})