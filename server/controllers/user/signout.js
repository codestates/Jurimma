const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunction/accessToken");

module.exports = {
  delete: async (req, res) => {
    try {
      const accTokenData = await isAuthorized(req);
      if (!accTokenData) {
        res.status(400).json({ message: "Invalid access token" });
      } else {
        console.log(accTokenData);
        const token = req.headers.Authorization;
        const realToken = token.split(" ")[1];
        const tokenCheck = verify(realToken, process.env.ACCESS_SECRET);
        await user.destroy({
          where: { id: tokenCheck.id },
          force: true,
        });
        res.status(200).json({ message: "ok" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
