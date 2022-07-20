const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const privateRoutes = require("./privateRoutes")
const { expressjwt } = require("express-jwt");

module.exports = (app) => {
    app.use(authRoutes);
    app.use("/users", userRoutes);
    app.use("/private", expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"], }), privateRoutes)
};
