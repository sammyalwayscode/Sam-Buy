const express = require("express");
const {
  getAllUser,
  getOneUser,
  createUser,
  verifyUser,
  createAdmin,
  verifyAdmin,
  signIn,
} = require("../controller/userController");
const router = express.Router();
const uploads = require("../config/multer");

router.route("/user").get(getAllUser);
router.route("/user/:id").get(getOneUser);
router.route("/user/register").post(uploads, createUser);
router.route("/user/:id/:token").get(verifyUser);
router.route("/admin/register").post(uploads, createAdmin);
router.route("/admin/:id/:token").post(verifyAdmin);
router.route("/signin").post(signIn);

module.exports = router;
