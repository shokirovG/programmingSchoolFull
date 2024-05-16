import axios from "axios";
export default class AuthService {
  static async login(payload) {
    return axios.post(`${process.env.NEXT_PUBLIC_URL}/api/login`, payload);
  }
}
