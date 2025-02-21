import mongoose from 'mongoose';
const OtpSchema=new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
},

{         
 timestamps:true,
}, 

       
);
const Otp=mongoose.model('Otps',OtpSchema);
export default  Otp;
