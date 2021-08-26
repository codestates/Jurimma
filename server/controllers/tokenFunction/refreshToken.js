require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  },
  isAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    const token = req.cookies;
    if (!token) {
      return null;
    } else {
      try {
        return verify(token.jwt, process.env.REFRESH_SECRET);
      } catch (error) {
        return null;
      }
    }
  },
};