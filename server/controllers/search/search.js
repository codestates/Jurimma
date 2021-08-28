const { content } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const wordName = await req.body.wordName;
      console.log(wordName);
      const searchData = await content.findAll({
        where: { wordName: wordName },
      });
      const resData = searchData.map((data) => data.dataValues);
      console.log(resData);
      res.status(200).json({ data: resData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
