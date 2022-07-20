const User = require("../models/User")


module.exports = {
    private: async (req, res) => {
        const user = await User.findById(req.auth.sub);
        if (user) {
            res.json({
                message: "OK",
                user,
            })
        } else {
            res.status(400).json({
                error: "El usuario no existe"
            });
        }
    }
}