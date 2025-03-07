import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
// admin auth middleware

const authAdmin=async(req,res,next)=>{
    try {
        
        const{atoken}=req.headers
        if(!atoken){
            return res.json({Success:false,message:"Not Authorized  A"})
        }

        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decode!=='durgeshchaudhary0111@gmail.com'+'12345678'){
            return res.json({Success:false,message:"Not Authorized B"})
        }

        next()

    } 
    catch (error) {
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}

export default authAdmin