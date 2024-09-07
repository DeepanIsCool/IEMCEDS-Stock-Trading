const express = require("express");
const router = express.Router();
const {
    Sign_up,
    Sign_in
} = require("../controllers/userController");



router.route("/signin").post(Sign_in);
router.route("/signup").post(Sign_up);





module.exports = router;