import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
// doc auth middleware

const authDoctor=async(req,res,next)=>{
    try {
        
        const{dtoken}=req.headers
        if(!dtoken){
            return res.json({Success:false,message:"Not Authorized"})
        }

        const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET)

        req.body.docId=token_decode.id

        next()

    } 
    catch (error) {
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}

export default authDoctor