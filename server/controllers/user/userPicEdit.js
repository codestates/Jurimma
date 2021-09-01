const { user } = require("../../models");
const {
  isAuthorized,
  generateAccessToken,
} = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { defaultImgs } = require("../user/imgResource");
const { verify } = require("jsonwebtoken");

const getRandomImg = (defaultImgs) => {
  const randomImgIdx = Math.floor(Math.random() * 4);
  return defaultImgs[randomImgIdx];
};

module.exports = {
  patch: async (req, res) => {
    const { userPic } = req.body;
    // console.log(userPic);
    if (!isAuthorized(req)) {
      if (refreshAuthorized(req)) {
        const token = req.cookies.refreshToken;
        const tokenCheck = verify(token, process.env.REFRESH_SECRET);
        delete tokenCheck.exp;
        const accessToken = generateAccessToken(tokenCheck);
        const userInfo = await user.findOne({
          where: { id: tokenCheck.id },
        });
        const newUserPics = defaultImgs.filter((el) => el !== userPic);
        userInfo.userPic = getRandomImg(newUserPics);
        await userInfo.save();
        res.status(201).json({ accessToken, message: "ok" });
      } else {
        res.status(401).json({ message: "Send new Login Request" });
      }
    } else {
      const token = req.headers.authorization;
      const realToken = token.split(" ")[1];
      const tokenCheck = verify(realToken, process.env.ACCESS_SECRET);
      const userInfo = await user.findOne({
        where: { id: tokenCheck.id },
      });
      const newUserPics = defaultImgs.filter((el) => el !== userPic);
      userInfo.userPic = getRandomImg(newUserPics);
      await userInfo.save();
      res.status(200).json({ message: "ok" });
    }
  },
};
