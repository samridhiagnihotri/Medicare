import jwt from "jsonwebtoken"

// user auth middleware

const authUser=async(req,res,next)=>{
    try {
        
        const{token}=req.headers
        if(!token){
            return res.json({Success:false,message:"Not Authorized"})
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET)

        req.body.userId=token_decode.id

        next()

    } 
    catch (error) {
        console.log(error)
        res.json({Success:false,message:error.message})
    }
}

export default authUser