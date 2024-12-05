const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        trim:true,
        minlength:[3,'username must be atleast 3 characters long']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        trim:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please provide a valid email address']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        unique:true,
        trim:true,
        minlength:[6,'password must be atleast 6 characters long']
    },
    refreshToken:{
        type:String
    },
},{timestamps:true});

module.exports=mongoose.model('User',userSchema)