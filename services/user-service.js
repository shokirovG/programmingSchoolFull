const User = require("../models/User");
const bcrypt = require("bcrypt");
const userDto = require("../dtos/user-Dtos");
const UserModel = require("../models/User");
const tokenService = require("./token-service");

class UserService {
  async reg(email, password, rol) {
    const condidate = await User.findOne({ email });
    if (condidate) {
      throw new Error(`${email} Bunday foydalanuvchi mavjud`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      email,
      password: hashPassword,
      rol,
    });
    const userDTO = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO,
    };
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "bunday foydalanuvchi mavjud emas",
      };
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      return {
        message: "parol hato",
      };
    }
    const userDTO = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userDTO });

    await tokenService.saveToken(userDTO.id, tokens.refreshToken);
    return { ...tokens, user: userDTO };
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      return { message: "Foydalanuvchi avtorizatsiya qilinmagan" };
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log("tokenFromDb", tokenFromDb);
    if (!userData || !tokenFromDb) {
      return { message: "Foydalanuvchi avtorizatsiya qilinmagan" };
    }
    const user = await UserModel.findById(userData.id);

    const userDTO = new userDto(user);

    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDTO,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new UserService();
