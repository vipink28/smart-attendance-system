const router = require("express").Router();

const { createStudent, createTeacher } = require("../controllers/admin.controller");
const { protect } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")

router.post("/students", protect, authorize("admin"), createStudent)
router.post("/teachers", protect, authorize("admin"), createTeacher)


module.exports = router;