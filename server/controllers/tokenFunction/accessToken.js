require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "2h" });
  },
  isAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    if (!req.headers.authorization) {
      return false;
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return false;
    } else {
      try {
        const tokenCheck = verify(token, process.env.ACCESS_SECRET);
        if (!tokenCheck) return false;
        return true;
      } catch (error) {
        return false;
      }
    }
  },
};
