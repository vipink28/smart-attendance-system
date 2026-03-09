const router = require("express").Router();


const { createSession, getClassSessions, getMySessions } = require("../controllers/session.controller");
const { protect } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")

router.post("/", protect, authorize("teacher"), createSession)
router.get("/class/:classId", protect, authorize("teacher", "admin"), getClassSessions);

router.get("/teacher/my-sessions", protect, authorize("teacher"), getMySessions);

module.exports = router