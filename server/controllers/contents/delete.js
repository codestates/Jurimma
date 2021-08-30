const { content, thumbs } = require("../../models");
const {
  generateAccessToken,
  isAuthorized,
} = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { verify } = require("jsonwebtoken");

module.exports = {
  post: async (req, res) => {
    if (isAuthorized(req)) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { contentId } = req.body; // 배열
      for (let i = 0; i < contentId.length; i++) {
        await content.destroy({
          where: { id: contentId[i] },
          force: true,
        });
        await thumbs.destroy({
          where: { content_Id: contentId[i] },
          force: true,
        });
      }
      res.status(200).json({ message: "ok" });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshAuthorized(req)) {
        const token = req.cookies.refreshToken;
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        delete tokenCheck.exp;
        const accessToken = generateAccessToken(tokenCheck);

        const { contentId } = req.body; // 배열
        for (let i = 0; i < contentId.length; i++) {
          await content.destroy({
            where: { id: contentId[i] },
            force: true,
          });
          await thumbs.destroy({
            where: { content_Id: contentId[i] },
            force: true,
          });
        }
        res.status(201).json({
          accessToken: accessToken,
          message: "ok",
        });
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: "Send new Login Request" });
      }
    }
  },
};
