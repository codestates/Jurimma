const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { verify } = require("jsonwebtoken");

module.exports = {
  patch: async (req, res) => {
    const { oldPassword, newPassword, username } = req.body;
    if (!isAuthorized(req)) {
      if (refreshAuthorized(req)) {
        const token = req.cookies.refreshToken;
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        const accessToken = generateAccessToken(tokenCheck);
        const isValid = await user.findOne({
          where: { password: oldPassword },
        });
        if (!isValid) {
          // 불일치하면 에러메세지 내보냄
          res.status(400).json({ message: "Wrong Password" });
        } else {
          // 유저 정보 수정
          isValid.username = username;
          isValid.password = newPassword;
          await isValid.save();
          res.status(200).json({ accessToken, message: "ok" });
        }
      } else {
        // 로그아웃하고 메인페이지로
        res.status(401).json({ message: "Send new Login Request" });
      }
    } else {
      // oldPassword 와 DB 에 존재하는 유저의 PW가 일치한지 판단
      const token = req.headers.authorization;
      const realToken = token.split(" ")[1];
      const userData = verify(realToken, process.env.ACCESS_SECRET);
      const isValid = await user.findOne({
        where: { password: oldPassword },
      });
      if (!isValid) {
        // 불일치하면 에러메세지 내보냄
        res.status(400).json({ message: "Wrong Password" });
      } else {
        // 유저 정보 수정
        isValid.username = username;
        isValid.password = newPassword;
        await isValid.save();
        res.status(200).json({ message: "ok" });
      }
    }
  },
};
