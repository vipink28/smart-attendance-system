const Session = require("../models/session.model");
const Attendance = require("../models/attendance.model");
const Class = require("../models/class.model");
const { getDistanceInMeters } = require("../utils/geo.utils");
const ExcelJS = require("exceljs");

exports.markAttendance = async (req, res) => {

    const session = await Session.findByQrToken(req.body.qrToken);

    if (!session) {
        return res.status(400).json({ message: "Invalid QR Code" });
    }

    if (new Date(session.expires_at) < new Date()) {
        return res.status(400).json({ message: "QR expired" });
    }

    if (!session.is_active) {
        return res.status(400).json({
            message: "Session closed"
        });
    }

    const enrolled = await Class.isStudentEnrolled(
        session.class_id,
        req.user.id
    );

    if (!enrolled) {
        return res.status(403).json({ message: "Not enrolled" });
    }

    if (session.lat && req.body.lat) {
        const distance = getDistanceInMeters(
            session.lat,
            session.lng,
            req.body.lat,
            req.body.lng
        );

        if (distance > 50) {
            return res.status(403).json({ message: "Location mismatch" });
        }
    }

    const result = await Attendance.markAttendance({
        sessionId: session.id,
        classId: session.class_id,
        studentId: req.user.id
    });

    if (result === 0) {
        return res.status(400).json({
            message: "Attendance already marked"
        });
    }

    res.status(201).json({
        message: "Attendance marked"
    });
};


exports.getAttendanceBySession = async (req, res) => {

    const data = await Attendance.findBySession(req.params.sessionId);
    res.json(data);
};


exports.getAttendanceByClass = async (req, res) => {
    const data = await Attendance.findByClass(req.params.classId);
    res.json(data);
};


exports.getAttendanceByStudent = async (req, res) => {
    const data = await Attendance.findByStudent(req.params.studentId);
    res.json(data);
};


exports.studentAttendanceSummary = async (req, res) => {
    const summary = await Attendance.studentSummary(req.params.studentId);
    res.json(summary);
};

exports.getAttendancePercentage = async (req, res) => {
    const data = await Attendance.attendancePercentage(req.params.studentId);
    res.json(data);
};

exports.getClassAttendanceReport = async (req, res) => {
    const report = await Attendance.classAttendanceReport(req.params.sessionId);
    res.json(report);
};

exports.exportAttendanceExcel = async (req, res) => {
    const sessionId = req.params.sessionId;
    const data = await Attendance.classAttendanceReport(sessionId);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");
    worksheet.columns = [
        { header: "Student ID", key: "student_id", width: 15 },
        { header: "Student Name", key: "username", width: 25 },
        { header: "Status", key: "attendance_status", width: 15 }
    ];

    data.forEach(row => {
        worksheet.addRow(row);
    });

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=attendance.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
};