const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const store = async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })
        const token = jwt.sign({ userId: user._id }, "UnStringMuyScreto");

        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error("Ocurrio un error al crear el usuario", error)
    }
};

const login = async (req, res) => {
    const userToFind = await User.findOne({
        email: req.body.email
    })
    const validate = await bcrypt.compare(req.body.password, userToFind.password)
    console.log(validate)

    const token = jwt.sign({ userId: userToFind._id }, "UnStringMuyScreto");

    res.status(200).json({ userToFind, token })
}

const home = async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (user) {
        res.json({
            message: "OK",
            user,
        });
    }
    else {
        res.status(400).json({
            error: "El usuario no existe",
        });
    }
}



module.exports = {
    store,
    login,
    home
}
