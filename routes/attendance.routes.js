const router = require("express").Router();

const { markAttendance } = require("../controllers/attendance.controller");
const { protect } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")

router.post("/mark", protect, authorize("student"), markAttendance)

module.exports = router