const Session = require("../models/session.model");
const crypto = require("crypto");
const QRCode = require("qrcode");

exports.createSession = async (req, res) => {

    const qrToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + (req.body.duration || 5) * 60000);

    const sessionId = await Session.create({
        classId: req.body.classId,
        teacherId: req.user.id,
        qrToken,
        expiresAt,
        lat: req.body.lat,
        lng: req.body.lng
    });

    // Generate QR code image
    const qrCode = await QRCode.toDataURL(qrToken);

    res.status(201).json({
        message: "QR session created",
        sessionId,
        qrToken,
        qrCode,
        expiresAt
    });
};

exports.getClassSessions = async (req, res) => {

    const sessions = await Session.findByClass(req.params.classId);

    res.json(sessions);
};


exports.getMySessions = async (req, res) => {

    const sessions = await Session.findByTeacher(req.user.id);

    res.json(sessions);
};