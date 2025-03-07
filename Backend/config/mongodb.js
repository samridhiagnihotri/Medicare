import mongoose from "mongoose";

const connectDB=async()=>{

    mongoose.connection.on('connected',()=> console.log("Database Connected"))
    await mongoose.connect('mongodb+srv://durgeshchaudhary0111:durgeshchaudhary1551@chat-bot.7kaaa.mongodb.net/?retryWrites=true&w=majority&appName=Chat-bot')
}

export default connectDB