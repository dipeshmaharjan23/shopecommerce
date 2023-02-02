const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controller/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);

router.get("/profile", isAuthenticatedUser, getUserProfile);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/updateProfile", isAuthenticatedUser, updateUserProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);

router
  .route("admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
