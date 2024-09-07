const express = require("express");
const router = express.Router();
const {
    Sign_up

} = require("../controllers/userController");



// router.route("/signin").post(signin);
router.route("/signup").post(Sign_up);





module.exports = router;