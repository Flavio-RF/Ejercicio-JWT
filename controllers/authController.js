const User = require("../models/User")
const jwt = require("jsonwebtoken")

module.exports = {
    newToken: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        console.log(password)


        try {
            const user = await User.findOne({ email });
            console.log(user)
            const match = await user.comparePassword(password);
            console.log(match)
            if (match) {
                const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
                res.json({
                    user,
                    accessToken: token,
                });
            } else {
                res.status(400).json({ error: "Credenciales inválidas." });
            }
        } catch (error) {
            console.log(`No se encontró el email: ${email}`);
            console.log(error);
            res.status(500).json({ error: "Internal Server error." });
        }
    },

};