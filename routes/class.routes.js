const express = require("express");
const { createClass, assignTeacher, getAllClasses, getMyClasses, addStudent, removeStudent, getClassStudents } = require("../controllers/class.controller");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")

/*Admin*/
router.post("/", protect, authorize("admin"), createClass)
router.post("/assign-teacher", protect, authorize("admin"), assignTeacher)
router.get("/", protect, authorize("admin"), getAllClasses)


/*Admin/Teacher*/
router.post("/add-student", protect, authorize("admin", "teacher"), addStudent);
router.post("/remove-student", protect, authorize("admin", "teacher"), removeStudent);


router.get("/teacher/my-classes", protect, authorize("teacher"), getMyClasses);

router.get("/:classId/students", protect, authorize("teacher", "admin"), getClassStudents);

module.exports = router;