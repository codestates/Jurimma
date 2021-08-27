require("dotenv").config();
const { user } = require("../../models");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  },
  isAuthorized: async (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    const token = req.cookies.refreshToken;
    if (!token) {
      return false;
    } else {
      const tokenCheck = verify(token, process.env.REFRESH_SECRET);
      const findData = await user.findOne({
        where: { id: tokenCheck.id },
      });
      if (!findData) {
        return false;
      } else {
        return true;
      }
    }
  },
};
