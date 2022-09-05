import { Controller } from "../models/interfaces";
import User, { UserSchema } from "../models/user";
const jtw = require("jsonwebtoken");
interface UserSchemaFromRecuest extends UserSchema {
  rePassword: string;
}

export const registerController: Controller = async (req, res, next) => {
  try {
    let {
      walt,
      password,
      email,
      adress,
      username,
      rePassword,
    }: UserSchemaFromRecuest = req.body;
    // ----------- Get Emails From DataBase For
    const isExist = await User.IsThereMail(email);

    let errors = [];
    // Password Verification
    if (password.length <= 8) {
      errors.push(
        "Password is too short, The password must contain at least 8 characters"
      );
    }
    if (!new RegExp(/[A-Z]+/, "g").test(password))
      errors.push("It must contain at least one capital letter");
    if (!new RegExp(/[a-z]+/, "g").test(password))
      errors.push("It must contain at least one lower letter");
    if (new RegExp(/[^A-Za-z0-9 ]|\s/, "gi").test(password))
      errors.push("It must not contain symbols and spaces");
    if (!(rePassword === password)) errors.push("Password does not match");
    if (!password) errors.push("Password not found");

    // Email Verification
    if (!new RegExp(/\w+@\w+\.\w+/, "gy").test(email))
      errors.push("Make sure you type the email correctly");
    if (isExist) errors.push("Email is already registered");
    if (!email) errors.push("Email not found");
    // Username Verification
    if (!username || username === "") errors.push("Username not found");
    // Adress Verification
    if (!adress || adress === "") errors.push("Adress not found");
    if (errors.length === 0) {
      const user: UserSchema = new User(
        username,
        adress,
        password,
        undefined,
        email,
        walt
      );
      const response = await User.register(user);
      res.status(201).send({ response, message: "was created" });
    } else {
      res.status(400).send({ errors });
    }
  } catch (errors) {
    res.status(400).send({ errors });
    next();
  }
};

export const loginController: Controller = async (req, res, next) => {
  try {
    let { password, email }: { email: string; password: string } = req.body;
    const isExist = await User.IsThereMail(email);
    if (isExist) {
      let validation = await User.login(email, password);
      if (validation) {
        const { id, username, walt, adress, salt } = validation;
        const token = jtw.sign(
          {
            sub: id,
            username,
            walt,
            adress,
            email
          },
          salt,
          {
            expiresIn: 1*100*60*60*15,
          }
        );
        res.status(200).send({accessToken:token});
      } else {
        res.status(401).send({ error: "wrong password" });
      }
    } else {
      res.status(401).send({ error: "There is no account with this email" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
