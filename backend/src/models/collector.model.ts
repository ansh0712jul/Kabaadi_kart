import mongoose,{Document, Schema , Model} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// define the inteface for collector Schema
 
export interface ICollector extends Document{
    _id: string;
    collectorName: string;
    collectorEmail: string;
    collectorPhn: string;
    password: string;
    refreshToken?: string;
    location: string;
    serviceAreas: string[]
    generateAccessToken(): string;
    generateRefreshToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
}


// define the user Schema

const collectorSchema = new Schema<ICollector>({
    collectorName : {
        type : String,
        trim : true,
        required : [true , "name is  required"],
        lowercase: true,

    },
    collectorEmail : {
        type : String,
        lowercase: true,
        trim : true,
        unique: true,
        required:[true, "emial is required"],

    },
    collectorPhn : {
        type : String,
        required : [true,"Phn no is required"],
        trim : true
    },
    password :{
        type: String,
        required:[true, "password is required"],
    },
    refreshToken: {
        type: String
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    serviceAreas: [
        {
            type: String,
            required: [true, "Service area is required"],
        }
    ]

})

// hashed the password

collectorSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
})

// method to check is password correct

collectorSchema.methods.isPasswordCorrect = async function(password : string) : Promise<boolean>{
    return await bcrypt.compare(password , this.password);
    
}

// generate access token 

collectorSchema.methods.generateAccessToken = function(): string{
    return jwt.sign(
        {
            _id:this._id,
            collectorName: this.collectorName,
            collectorEmail: this.collectorEmail

        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

// generate refresh token

collectorSchema.methods.generateRefreshToken = function(): string{
    return jwt.sign(
        {
            _id: this._id,
            collectorName: this.collectorName,
            collectorEmail: this.collectorEmail
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    )
}

const Collector : Model<ICollector> = mongoose.model<ICollector>("Collector" , collectorSchema);
export default Collector