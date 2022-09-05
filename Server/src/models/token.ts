const jtw = require("jsonwebtoken");

export function tokenDecode(req: string) {
  const token: {
    sub: number;
    username: string;
    walt: number;
    adress: string;
    email: string;
    iat: number;
    exp: number;
  } = jtw.decode(req);
  return token;
}
