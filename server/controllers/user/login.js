const { user } = require("../../models");
const { generateAccessToken } = require("../tokenFunction/accessToken");
const {
  generateRefreshToken,
  sendRefreshToken,
} = require("../tokenFunction/refreshToken");
const { decryptPwd } = require("../hashing/hashingPwd");

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Invalid User" });
      }
      const findData = await user.findOne({
        where: { email: email },
      });
      if (!findData) {
        res.status(400).json({ message: "Wrong Email" });
      } else {
        const DBPwd = decryptPwd(findData.dataValues.password);
        console.log("복호화 된 암호 : ", DBPwd);
        if (DBPwd !== password) {
          res.status(400).json({ message: "Wrong Password" });
        } else {
          delete findData.dataValues.password;
          const accessToken = generateAccessToken(findData.dataValues);
          const refreshToken = generateRefreshToken(findData.dataValues);
          sendRefreshToken(res, refreshToken);
          res.status(201).json({
            accessToken: accessToken,
            userInfo: findData.dataValues,
            message: "ok",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
