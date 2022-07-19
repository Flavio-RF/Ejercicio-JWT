const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
const { expressjwt } = require("express-jwt");


router.post("/users", userController.store)
router.post("/login", userController.login)
router.get("/private", expressjwt({ secret: "UnStringMuyScreto", algorithms: ["HS256"] }), userController.home)



module.exports = router 