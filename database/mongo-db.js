import mongoose from "mongoose"

//connecting mongodb database
const Connection = async (userName , pass)=>{
    
    const URL = `mongodb+srv://${userName}:${pass}@cluster0.sbs0j5y.mongodb.net/vedic?retryWrites=true&w=majority`

    try {
        
        await mongoose.connect(URL)
        console.log("Database Connected Successfuly")

    } catch (error) {

        console.log('Errorr while connecting database',error)
        
    }
}

export default Connection
