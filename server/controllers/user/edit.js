const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunction/accessToken");
const { verify } = require("jsonwebtoken");

module.exports = {
  patch: async (req, res) => {
    try {
      if (!isAuthorized(req)) {
        res.status(401).json({ message: "Send new Login Request" });
      } else {
        const { oldPassword, newPassword, username } = req.body;
        // oldPassword 와 DB 에 존재하는 유저의 PW가 일치한지 판단
        const token = req.headers.authorization;
        const realToken = token.split(" ")[1];
        const userData = verify(realToken, process.env.ACCESS_SECRET);
        const isValid = await user.findOne({
          where: { password: oldPassword },
        });
        if (!isValid) {
          res.status(400).json({ message: "Wrong Password" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
