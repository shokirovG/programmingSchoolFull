const TokenModel = require("../models/TokenModel");
const userService = require("../services/user-service");

class UserController {
  async reg(req, res, next) {
    try {
      const { email, password, rol } = req.body;
      const userData = await userService.reg(email, password, rol);
      res.cookie("refreshToken", userData.refreshToken, {
        SameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
    next();
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        SameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      // const token = await userService.logout(refreshToken);
      const token = await TokenModel.deleteOne({ refreshToken });
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log("token-1", refreshToken);
      const userData = await userService.refresh(refreshToken);
      console.log("cookie refresh", userData);
      res.cookie("refreshToken", userData.refreshToken, {
        SameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["asdasd", "332424"]);
    } catch (error) {}
  }
}

module.exports = new UserController();
