const { user } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunction/accessToken");
const { generateRefreshToken, sendRefreshToken } = require("../tokenFunction/refreshToken");

module.exports = {
    post: (req, res) => {
        


        // res.send("This is user/logout");
    }
}