import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

// API for adding doctor
const addDoctor=async (req,res)=>{
    try{
        
        const{name ,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file

        // console.log({name ,email,password,speciality,degree,experience,about,fees,address},imageFile) 

        //checking for all daata to add doctor
        if(!name || ! email  || !password || ! speciality || ! degree || ! experience || ! about || ! fees || ! address){
            return res.json({Success:false,message:"Missing details"})
        }

        //validating email format
        if(! validator.isEmail(email)){
            return res.json({Success:false,message:"Please enter a valid email"})
        }
        //validating strong password
        if(password.length<8){
            return res.json({Success:false,message:"Password must me 8 character"})
        }

        //hashing doctor password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            // address:json.parse(address),
            address:address,
            date:Date.now()
        }


        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({Success:true,message:"Doctor added"})


    }catch(error){
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}


//API for the admin login

const loginAdmin=async(req,res)=>{
    console.log(req.body)
    try {

        const{email,password}=req.body

        if(email==='durgeshchaudhary0111@gmail.com' && password==='12345678'){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token,message:"Login Successful"})
        }

        else{
            res.json({Success:false,message:"Invalid credentials"})
        }

    } 
    
    catch (error) {
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}

//api to get all doctor list from admin panel

const allDoctors=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// api to get all appointment list
const appointmentsAdmin=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for appointment cancellation
const appointmentCancel=async(req,res)=>{
    try {

        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment cancelled'})

    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to get dashboard data for admin panel

const adminDashboard=async(req,res)=>{
    try {
        
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)

        }

        res.json({success:true,dashData})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export{addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}