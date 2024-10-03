import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:''
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female'],
    }
},{timestamps:true})

const userModel = mongoose.model('User', userSchema);
export default userModel;