import { db } from "../db";
import crypto from "crypto";
import shortid from "shortid";

const hashPassword = (password: string, salt: string = "secret-kalumian") => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

export interface UserSchema {
  username: string;
  adress: JSON;
  password: string;
  salt?: string | undefined;
  email: string;
  walt: number | undefined;
}
export default class User implements UserSchema {
  username: string;
  adress: JSON;
  salt?: string | undefined;
  password: string;
  email: string;
  walt: number | undefined;
  constructor(
    username: string,
    adress: JSON,
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
  static async GetEmails() {
    const order = `SELECT email FROM \`k-shop\`.users `;
    const [result]: any = await db.execute(order);
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
    '${JSON.stringify(Props.adress)}',
    '${Props.password}',
    '${Props.salt}',
    '${Props.email}',
    ${Props.walt}
    );
    `;
    const result = await db.execute(order);
    return result;
  }
}
