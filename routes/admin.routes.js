const router = require("express").Router();

const {
    createStudent,
    createTeacher,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.post("/students", protect, authorize("admin"), createStudent);
router.post("/teachers", protect, authorize("admin"), createTeacher);

router.get("/students", protect, authorize("admin"), getStudents);
router.get("/students/:id", protect, authorize("admin"), getStudent);
router.put("/students/:id", protect, authorize("admin"), updateStudent);
router.delete("/students/:id", protect, authorize("admin"), deleteStudent);

router.get("/teachers", protect, authorize("admin"), getTeachers);
router.get("/teachers/:id", protect, authorize("admin"), getTeacher);
router.put("/teachers/:id", protect, authorize("admin"), updateTeacher);
router.delete("/teachers/:id", protect, authorize("admin"), deleteTeacher);

module.exports = router;