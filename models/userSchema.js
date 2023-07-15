import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        require: [true, "enter user name"],
    },
    email: {
        type: String,
        unique:[true,"email address is already taken"],
        require: [true, "enter mail address"],
    },
    password: {
        type: String,
        require: [true, "enter your password"],
    },
},{
    timestamps:true,
});
 const User = mongoose.model("User",contactSchema);
 

export default User;