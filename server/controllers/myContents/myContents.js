const { content } = require("../../models");
const {
  isAuthorized,
  generateAccessToken,
} = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { verify } = require("jsonwebtoken");

module.exports = {
  get: async (req, res) => {
    // accessToken이 만료되지 않았을 경우,
    // => 바로 요청에 대한 응답 제공
    if (isAuthorized(req)) {
      const token = req.headers.authorization;
      const realToken = token.split(" ")[1];
      const tokenCheck = verify(realToken, process.env.ACCESS_SECRET);
      // console.log(tokenCheck);
      const myData = await content.findAll({
        where: { userId: tokenCheck.id },
      });
      // console.log(myData);
      const userData = {
        username: tokenCheck.username,
        userPic: tokenCheck.userPic,
      };
      const returnData = myData.map((data) =>
        Object.assign(data.dataValues, userData)
      );

      res.status(200).json({ data: returnData });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshAuthorized(req)) {
        const token = req.cookies.refreshToken;
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        delete tokenCheck.exp;
        const accessToken = generateAccessToken(tokenCheck);

        const myData = await content.findAll({
          where: { userId: tokenCheck.id },
        });
        // console.log(myData);
        const userData = {
          username: tokenCheck.username,
          userPic: tokenCheck.userPic,
        };
        const returnData = myData.map((data) =>
          Object.assign(data.dataValues, userData)
        );
        res.status(201).json({
          accessToken: accessToken,
          data: returnData,
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
