const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const newUserData = await req.body;
      //   console.log(newUserData);
      const isValid = await user.findAll({
        where: { email: newUserData.email },
      });
      const { email, phone, password, userName } = newUserData;
      if (!email || !phone || !password || !userName) {
        res.status(422).json({ message: "Wrong Info" });
      } else if (isValid[0]) {
        res.status(409).json({ message: "Already Existed" });
      } else {
        const signUpUser = await user.create({
          email,
          phone,
          password,
          username: userName,
        });
        res.status(200).json({ message: "ok" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
