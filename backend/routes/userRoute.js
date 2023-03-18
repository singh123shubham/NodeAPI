const express = require("express");
const { registerUser, loginUser, logout, getUserDetails, getAllUser, getSingleUser } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route('/me').get(isAuthenticatedUser,getUserDetails)


router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
// router.route('/admin/users/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)




module.exports = router;
