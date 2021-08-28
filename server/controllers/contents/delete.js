const { content, thumbs } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunction/accessToken");
const { refreshAuthorized } = require("../tokenFunction/refreshToken");
const { verify } = require("jsonwebtoken");

module.exports = {
    post: async(req, res) => {
        if(isAuthorized(req)) {
            // accessToken이 만료되지 않았을 경우,
            // => 바로 요청에 대한 응답 제공
            const token = req.headers.authorization;
            const realToken = token.split(" ")[1];
            // console.log(realToken);
            const tokenCheck = verify(realToken, process.env.ACCESS_SECRET);
        }
        
    },
}