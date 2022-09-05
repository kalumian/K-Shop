import axios from "axios";
import decode from "jwt-decode";
const API_URL: string = "http://localhost:3000/user";

class AuthService {
  static async login(email: string, password: string) {
    const response = await axios.post(API_URL + "/login", {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  }
  static async register({
    email,
    password,
    rePassword,
    username,
    adress,
  }: {
    email: string;
    password: string;
    rePassword: string;
    username: string;
    adress: string;
  }) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      rePassword,
      adress,
    });
  }
  static logout(): void {
    localStorage.removeItem("user");
  }
  static getCurrentUser() {
    return JSON.parse(String(localStorage.getItem("user")));
  }
  static getUserAsObject(): {
    adress: string;
    email: string;
    exp: number;
    iat: number;
    sub: number;
    username: string;
    walt: number;
  } {
    return decode(
      JSON.parse(String(localStorage.getItem("user")))?.accessToken
    );
  }
  static isUser(): boolean {
    return Boolean(AuthService.getCurrentUser()?.accessToken);
  }
  static tokenVerify(error: any) {
    if (error.expiredAt) {
      this.logout();
    }
  }
}

export default AuthService;
