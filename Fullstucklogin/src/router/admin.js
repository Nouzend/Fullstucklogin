const express = require("express");
const { authenticateToken, authorizeAdmin } = require("../middlewares/jwt");
const {registerAdmin,getAllUsers,getUserById,updateUserById,} = require("../controllers/admin");
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeAdmin);

router.post("/register", registerAdmin);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id/profile", updateUserById);

module.exports = router;
