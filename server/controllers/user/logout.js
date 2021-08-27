const { generateAccessToken, isAuthorized } = require("../tokenFunction/accessToken");
const { generateRefreshToken, sendRefreshToken } = require("../tokenFunction/refreshToken");

module.exports = {
    post: (req, res) => {
        if(!isAuthorized(req)) {
            res.status(400).json({ message: "You are not loged in!" });
        } else {
            const accessToken = generateAccessToken(null);
            const refreshToken = generateRefreshToken(null);
            sendRefreshToken(res, refreshToken);
            res.status(200).json({
                accessToken: accessToken,
                message: "Success!"
            });
        }
    }
}