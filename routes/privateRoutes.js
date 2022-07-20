const express = require("express")
const router = express.Router()
const privateController = require("../controllers/privateController")

router.get("/", privateController.private)


module.exports = router