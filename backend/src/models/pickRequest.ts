import mongoose , {Document , Schema , Model}  from "mongoose";


// defingin the interface of the address schema 

interface IAddress {
    street : string,
    city : string,
    state : string,
    postal : string,
    country : string
}

// defining the interface for the pick up request schema

export interface IPickRequest extends Document{
    name : string,
    email : string,
    phone : string,
    address : IAddress,
    sellOrDonate : "Sell" | "Donate",
    pickUpDate : string,
    pickUpTime : string,
    category : string[],
    img?: string,
    status : "Pending" | "Approved" | "Rejected",
    acceptedBy?: mongoose.Types.ObjectId;
    collectorName?: mongoose.Types.ObjectId;
    collectorEmail?: mongoose.Types.ObjectId;
    collectorPhn?: mongoose.Types.ObjectId;

}
// address schema 
const addressSchema = new Schema<IAddress>({
    street : {
        type : String,
        required : [true,"street is required"],
        trim:true
    },
    city : {
        type : String,
        required : [true,"city is required"],
        trim : true
    },
    state: {
        type: String,
        required: [true, "State is required!!!"],
        trim: true,
    },
    postal: {
        type: String,
        required: [true, "Postal is required!!!"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Country is required!!!"],
        trim: true,
    }
},{
    timestamps : true
})

// pick up Request Schema 
const pickRequestSchema = new Schema<IPickRequest>({
    name : {
        type : String,
        required : [true,"name is required"],
        trim : true,
        
    },
    email : {
        type : String,
        required : [true,"email is required"],
        trim : true,
        lowercase : true
    },
    phone : {
        type : String,
        required : true
    },
    address :
        addressSchema
    ,
    sellOrDonate:{
        type : String,
        enum : ["Sell","Donate"],
        default : "Sell",
        required : true
    },
    pickUpDate : {
        type : String,
        required : true
    },
    pickUpTime : {
        type : String,
        required : true
    },
    category :{
        type: [
            String
        ],
        required: true,
    },
    img:{
        type : String, // cloudinary id
    },
    status : {
        type : String,
        enum : ["Pending","Accepted","Rejected"],
        default : "Pending"       
    },
    acceptedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collector"
    },
    collectorName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collector"
    },
    collectorEmail : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collector"
    },
    collectorPhn : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collector"
    }
    
    
})

const PickRequest : Model<IPickRequest> = mongoose.model<IPickRequest>("PickRequest",pickRequestSchema);

export {
    PickRequest
}