const { isAuthorized } = require("../tokenFunction/accessToken");
const { sendRefreshToken } = require("../tokenFunction/refreshToken");

module.exports = {
  post: (req, res) => {
    console.log(req.headers);
    if (!isAuthorized(req)) {
      res.status(401).json({ message: "You are not loged in!" });
    } else {
      sendRefreshToken(res, null);
      res.status(200).json({
        accessToken: null,
        message: "Success!",
      });
    }
  },
};
