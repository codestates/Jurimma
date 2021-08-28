
module.exports = {
    post: (req, res) => {
        res.send("This is contents_new(POST)");
    },

    delete: (req, res) => {
        
        res.send("This is contents_delete(DELETE)");
    },

    patch: (req, res) => {
        res.send("This is contents_edit(PATCH)")
    }
}