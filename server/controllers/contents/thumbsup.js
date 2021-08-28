const { content, thumbs } = require("../../models");
const {
  generateAccessToken,
  isAuthorized,
} = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { verify } = require("jsonwebtoken");

module.exports = {
  patch: async (req, res) => {
    const contentsId = await req.body.contentsId;
    const auth = await isAuthorized(req);
    if (!auth) {
      if (refreshAuthorized(req)) {
        // accToken과 객체 같이 내보냄
        const token = req.cookies.refreshToken;
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        const accessToken = generateAccessToken(tokenCheck);
        const dbContent = await content.findOne({
          where: { id: contentsId },
        });
        await dbContent.increment("thumbsup");
        const updatedContent = await content.findOne({
          where: { id: contentsId },
        });
        await thumbs.create({
          user_Id: tokenCheck.id,
          content_Id: contentsId,
        });
        res.status(200).json({ accessToken, updatedContent });
      } else {
        // 로그아웃하고 메인페이지로
        res.status(401).json({ message: "Send new Login Request" });
      }
    } else {
      // 응답 200
      const accToken = req.headers.authorization;
      const realToken = accToken.split(" ")[1];
      const userData = verify(realToken, process.env.ACCESS_SECRET);
      const dbContent = await content.findOne({
        where: { id: contentsId },
      });
      await dbContent.increment("thumbsup");
      const updatedContent = await content.findOne({
        where: { id: contentsId },
      });
      await thumbs.create({ user_Id: userData.id, content_Id: contentsId });
      res.status(200).json({ data: updatedContent });
    }
  },
};
