import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    
    name: {
        type: String,
        require: [true, "enter contact name"],
    },
    email: {
        type: String,
        require: [true, "enter mail"],
    },
    phone: {
        type: String,
        require: [true, "enter number"],
    },
},{
    timestamps:true,
});
 const Contact = mongoose.model("Contact",contactSchema);
 

export default Contact;
