const router = require("express").Router();


const { createSession } = require("../controllers/session.controller");
const { protect } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")

router.post("/", protect, authorize("teacher"), createSession)

module.exports = router