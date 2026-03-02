const express = require('express');
const cors = require("cors");
const authRoutes = require("./routes/auth.routes")
const adminRoutes = require("./routes/admin.routes")
const classRoutes = require("./routes/class.routes")
const attendanceRoutes = require("./routes/attendance.routes")
const sessionRoutes = require("./routes/session.routes")

const app = express();

app.use(cors()); // this is only for development or public api, not for proudction 

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/sessions", sessionRoutes)


module.exports = app;