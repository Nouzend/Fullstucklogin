const express = require("express");
const { authenticateToken } = require("../middlewares/jwt");
const {getMyProfile,editMyProfileById,editMyPasswordById,} = require("../controllers/useR");
const router = express.Router();

router.use(authenticateToken);

router.put("/my-profile", editMyProfileById);
router.put("/my-password", editMyPasswordById);
router.get("/my-profile", getMyProfile);

module.exports = router;
