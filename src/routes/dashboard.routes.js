const express = require("express");
const { getMyDashboard } = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, getMyDashboard);

module.exports = router;