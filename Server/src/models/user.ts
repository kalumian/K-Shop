import { db } from "../db";
import crypto from "crypto";
import shortid from "shortid";

const hashPassword = (password: string, salt: string = "secret-kalumian") => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

export interface UserSchema {
  username: string;
  adress: string;
  password: string;
  salt?: string | undefined;
  email: string;
  walt: number | undefined;
}
export default class User implements UserSchema {
  username: string;
  adress: string;
  salt?: string | undefined;
  password: string;
  email: string;
  walt: number | undefined;
  constructor(
    username: string,
    adress: string,
    password: string,
    salt: string | undefined,
    email: string,
    walt: number | undefined
  ) {
    this.username = username;
    this.adress = adress;
    this.salt = !salt ? shortid.generate() : salt;
    this.password = hashPassword(password, this.salt);
    this.email = email;
    this.walt = !walt ? 0 : walt;
  }

  // Methods
  static async IsThereMail(email: string) {
    const order = `SELECT email,salt FROM \`k-shop\`.users where email = "${email}"`;
    const [[result]]: any = await db.execute(order);
    return result;
  }

  static async register(Props: User) {
    const order = `INSERT INTO \`k-shop\`.\`users\`
    (
    username,
    adress,
    password,
    salt,
    email,
    walt
    )
    VALUES
    (
    '${Props.username}',
    '${Props.adress}',
    '${Props.password}',
    '${Props.salt}',
    '${Props.email}',
    ${Props.walt}
    );
    `;
    const result = await db.execute(order);
    return result;
  }
  static async login(email: string, password: string) {
    let order = `SELECT * FROM \`k-shop\`.users where email = "${email}";`;
    const [[result], _] = await db.execute(order);

    if (result.password === hashPassword(password, result.salt)) {
      return result;
    } else {
      return false;
    }
  }
}
