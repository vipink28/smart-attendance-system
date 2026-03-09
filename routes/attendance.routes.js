const router = require("express").Router();

const {
    markAttendance,
    getAttendanceBySession,
    getAttendanceByClass,
    getAttendanceByStudent,
    studentAttendanceSummary,
    getAttendancePercentage,
    getClassAttendanceReport,
    exportAttendanceExcel
} = require("../controllers/attendance.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.post("/mark", protect, authorize("student"), markAttendance);

router.get("/session/:sessionId", protect, authorize("teacher", "admin"), getAttendanceBySession);

router.get("/class/:classId", protect, authorize("teacher", "admin"), getAttendanceByClass);

router.get("/student/:studentId", protect, authorize("admin", "teacher"), getAttendanceByStudent);

router.get("/summary/:studentId", protect, authorize("admin", "teacher", "student"), studentAttendanceSummary);

router.get(
    "/percentage/:studentId",
    protect,
    authorize("admin", "teacher", "student"),
    getAttendancePercentage
);

router.get(
    "/report/:sessionId",
    protect,
    authorize("teacher", "admin"),
    getClassAttendanceReport
);

router.get(
    "/export/:sessionId",
    protect,
    authorize("teacher", "admin"),
    exportAttendanceExcel
);

module.exports = router;