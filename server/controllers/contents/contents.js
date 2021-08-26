
module.exports = {
    post: (req, res) => {
        res.send("This is contents_new(POST)");
    },

    patch: (req, res) => {
        res.send("This is contents_edit(PATCH)")
    }
}