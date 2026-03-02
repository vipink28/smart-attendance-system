const Session = require("../models/session.model");
const Attendance = require("../models/attendance.model");
const Class = require("../models/class.model");
const { getDistanceInMeters } = require("../utils/geo.utils");

exports.markAttendance = async (req, res) => {

    const session = await Session.findByQrToken(req.body.qrToken);

    if (!session) {
        return res.status(400).json({ message: "Invalid QR Code" });
    }

    if (new Date(session.expires_at) < new Date()) {
        return res.status(400).json({ message: "QR expired" });
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

    await Attendance.markAttendance({
        sessionId: session.id,
        classId: session.class_id,
        studentId: req.user.id
    });

    res.status(201).json({ message: "Attendance marked" });
};