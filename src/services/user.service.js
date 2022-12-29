import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/user.util';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

/* //create new user 
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};
 */
/* //create new user
export const newUser = async (body) => {
  const checkuser = await User.findOne({email:body.email});
  if(checkuser){
    throw new Error("User with same mailid Already exits");
  }
  else{
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(body.password,saltRounds);
    body.password = hashedPassword;
    const data = await User.create(body);
    return data;
  }
};
 */
//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};

 //loginuser
export const loginuser=async (body)=>{
  const data= await User.findOne({email:body.email});
  //console.log("data------------------>",data);
  if(data){
    const result= await bcrypt.compare(body.password,data.password);
   // console.log("result------------------->",result)
    if(result!==null){
      const token=jwt.sign({email:body.email,id:data._id},process.env.SECRETE_KEY);
      return token;
     // return data;

    }else{
      throw new Error("Password is Invalid");
    }
  }else{
    throw new Error("email is invalid");
  }
}; 

//Reset password
export const ResetPassword = async (body) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  const data = await User.findOneAndUpdate(
    {email:body.email},
    {password:hashPassword},
    {
      new: true
    }
  );
  return data;
};

//Forgot password
export const forgotPassword = async (body) => {
  // To check email id is register or not in database
  const data = await User.findOne({ email: body.email });
  if (data !== null) {
    var passwordToken = jwt.sign({email: data.email, id: data._id}, process.env.SECRETE_KEY);
    const result = await sendMail(data.email);
    return passwordToken;
  }
  else {
    throw new Error("Invalid Email ID");
  }
};
 