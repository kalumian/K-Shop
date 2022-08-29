import { Controller } from "../models/interfaces";
import User, { UserSchema } from "../models/user";


interface UserSchemaFromRecuest extends UserSchema  {
  rePassword:string
}

export const registerController: Controller = async (req, res, next) => {
  try {
    let { walt, password , email , adress , username , rePassword}: UserSchemaFromRecuest = req.body;
    // ----------- Get Emails From DataBase For 
    const listOfemails: { email: string }[] = await User.GetEmails();
    const emails = listOfemails.map((el) => el.email);
    let errors = [];
    // Password Verification
    if (password.length <= 8) {errors.push("Password is too short, The password must contain at least 8 characters");}
    if (!new RegExp(/[A-Z]+/, "g").test(password))errors.push("It must contain at least one capital letter");
    if (!new RegExp(/[a-z]+/, "g").test(password))errors.push("It must contain at least one lower letter");
    if (new RegExp(/[^A-Za-z0-9 ]|\s/, "gi").test(password))errors.push("It must not contain symbols and spaces");
    if (!(rePassword === password))errors.push("Password does not match");
    if(!password)errors.push("Password not found")
    
    // Email Verification
    if (!new RegExp(/\w+@\w+\.\w+/, "gy").test(email))errors.push("Make sure you type the email correctly");
    if (emails.includes(email))errors.push("Email is already registered");
    if(!email)errors.push("Email not found")
    // Username Verification
    if(!username || username === "")errors.push("Username not found")
    // Adress Verification
    if(!adress || adress === "")errors.push("Adress not found")
    if(errors.length === 0){
      const user : UserSchema = new User(username,adress,password,undefined , email , walt)
      const response = await User.register(user)
      res.status(201).send(response)
    }else{
      res.status(400).send({errors})
      }
  } catch (error) {
    res.status(400).send({ error });
    next();
  }
};
