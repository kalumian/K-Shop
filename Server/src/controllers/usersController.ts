import { Controller } from "../models/interfaces";
import User, { UserSchema } from "../models/user";

export const registerController: Controller = async (req, res, next) => {
  try {
    let { username, walt, adress }: UserSchema = req.body;

    // ----------- Start Promises for Email And Password Problems --------------

    const PasswordVerification: any = new Promise((resolve, reject) => {
      let error = [];
      if (req.body.password.length <= 8) {
        error.push(
          "Password is too short, The password must contain at least 8 characters"
        );
      } else {
        if (!new RegExp(/[A-Z]+/, "g").test(req.body.password))
          error.push("It must contain at least one capital letter");
        if (!new RegExp(/[a-z]+/, "g").test(req.body.password))
          error.push("It must contain at least one lower letter");
      }
      if (new RegExp(/[^A-Za-z0-9 ]|\s/, "gi").test(req.body.password))
        error.push("It must not contain symbols and spaces");
      if (error.length === 0) {
        resolve(req.body.password);
      } else {
        reject({
          Error: new Error(error.join(" , ")),
          "Errors In Array": error,
        });
      }
    });
    const EmailVerification: any = new Promise((resolve, reject) => {
      let error: string[] = [];
      User.GetEmails().then((i: { email: string }[]) => {
        const emails = i.map((el) => el.email);
        if (emails.includes(req.body.email))
          error.push("Email is already registered");
        if (!new RegExp(/\w+@\w+\.\w+/, "gy").test(req.body.email))
          error.push("Make sure you type the email correctly");
        if (error.length === 0) {
          resolve(req.body.email);
        } else {
          reject({
            Error: new Error(error.join(" , ")),
            "Errors In Array": error,
          });
        }
      });
    });

    // ----------- End Promises for Email And Password Problems --------------

    const password = await PasswordVerification;
    const email = await EmailVerification;

    const user = new User(username, adress, password, undefined, email, walt);

    let Response: any = await User.register(user);
    res.status(201).send(Response);
  } catch (error) {
    res.status(400).send({ error });
    next();
  }
};
