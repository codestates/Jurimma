const { user } = require("../../models");
const { encryptPwd } = require("../hashing/hashingPwd");
const { defaultImgs } = require("../user/imgResource");

const getRandomImg = (defaultImgs) => {
  const randomImgIdx = Math.floor(Math.random() * 5);
  return defaultImgs[randomImgIdx];
};

module.exports = {
  post: async (req, res) => {
    try {
      const newUserData = await req.body;
      //   console.log(newUserData);
      const isValid = await user.findAll({
        where: { email: newUserData.email },
      });
      const { email, phone, password, username } = newUserData;
      if (!email || !phone || !password || !username) {
        res.status(422).json({ message: "Wrong Info" });
      } else if (isValid[0]) {
        res.status(409).json({ message: "Already Existed" });
      } else {
        const encrypted = encryptPwd(password);
        console.log("en : ", encrypted);
        await user.create({
          email,
          phone,
          password: encrypted,
          username: username,
          userPic: getRandomImg(defaultImgs),
        });
        res.status(200).json({ message: "ok" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
