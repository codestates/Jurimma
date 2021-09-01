require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      domain: "jurimma-client.s3-website.ap-northeast-2.amazonaws.com",
      path: "/",
      secure: true,
      sameSite: "none",
    });
  },
  refreshAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    if (!req.cookies) {
      return false;
    }
    const token = req.cookies.refreshToken;
    if (!token) {
      return false;
    } else {
      try {
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        if (!tokenCheck) return false;
        return true;
      } catch (error) {
        return false;
      }
    }
  },
};
