require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "2h" });
  },
  isAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    const token = req.headers.Authorization;
    if (!token) {
      return null;
    } else {
      try {
        const realToken = token.split(" ")[1];
        return verify(realToken, process.env.ACCESS_SECRET);
      } catch (error) {
        return null;
      }
    }
  },
};
