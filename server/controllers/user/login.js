const { user } = require("../../models");
const { generateAccessToken } = require("../tokenFunction/accessToken");
const {
  generateRefreshToken,
  sendRefreshToken,
} = require("../tokenFunction/refreshToken");

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(401).json({ message: "Invalid User" });
      }
      const findData = await user.findOne({
        where: { email: email, password: password },
      });
      if (!findData) {
        res.status(401).json({ message: "Invalid User" });
      } else {
        delete findData.dataValues.password;
        const accessToken = generateAccessToken(findData.dataValues);
        const refreshToken = generateRefreshToken(findData.dataValues);
        sendRefreshToken(res, refreshToken);
        res.status(200).json({
          accessToken: accessToken,
          userInfo: findData.dataValues,
          message: "ok",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
