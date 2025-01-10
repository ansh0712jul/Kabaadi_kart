import mongoose , {Document , Schema , Model} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// define the interfaceof user Schema 
interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    refreshToken?: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    verificationToken?: string;
    verificationTokenExpires?: Date;
    generateAccessToken(): string;
    generateRefreshToken(): string;
    
}

// define the user Schema
const userSchema = new Schema<IUser>({
    username : {
        type: String,
        unique: true,
        trim: true,
        required: [true , "name is  required"],
        lowercase: true
    },
    email : {
        type: String,
        lowercase: true,
        unique: true,
        required:[true, "emial is required"],
        trim: true

    },
    password :{
        type: String,
        required:[true, "password is required"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpires:{
        type: Date
    }
}, 
    {
        timestamps: true
    }
);

// hashed the password before saving 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10);
})

// check is password correct 

userSchema.methods.isPasswordCorrect = async function(password : string) : Promise<boolean>{
    return await bcrypt.compare(password , this.password);
    
}

// generate access token
userSchema.methods.generateAccessToken = function(): string{
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.Access_Token_Secret as string,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

// Generate refresh token 
userSchema.methods.generateRefreshToken = function(): string{
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.Refresh_Token_Secret as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    )
}
// create the model

const User : Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;