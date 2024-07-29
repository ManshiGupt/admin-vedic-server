import mongoose from "mongoose"

//connecting mongodb database
const Connection = async (userName , pass)=>{
    
    const URL = `mongodb+srv://${userName}:${pass}@cluster0.sbs0j5y.mongodb.net/vedic?retryWrites=true&w=majority`

    try {
        
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Database Connected Successfuly")

    } catch (error) {

        console.log('Error while connecting database',error)
        
    }
}

export default Connection
