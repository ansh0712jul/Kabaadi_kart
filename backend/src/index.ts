import connectDB from "./db";
import app from "./app";

// connecting to Database
connectDB()
.then(() =>{
    const port = process.env.PORT || 8088 ;
    app.listen(port, () => {
        console.log(`🥳🥳 Listening on port ${port} 🥳🥳`);
    })   
})
.catch((error : any) => {
    console.log("MongoDb connection error ",error.message);
})
