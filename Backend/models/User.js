import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  settings:{
  lightMode:{
    type:Boolean,
    default:false
  },
  showHistory:{
    type:Boolean,
    default:true
  }
}
});

export default mongoose.model("User", UserSchema);