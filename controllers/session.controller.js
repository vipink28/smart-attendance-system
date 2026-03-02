const Session = require("../models/session.model");
const crypto = require("crypto");

exports.createSession = async (req, res) => {

    const qrToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + (req.body.duration || 5) * 60000);

    await Session.create({
        classId: req.body.classId,
        teacherId: req.user.id,
        qrToken,
        expiresAt,
        lat: req.body.lat,
        lng: req.body.lng
    });

    res.status(201).json({
        message: "QR session created",
        qrToken,
        expiresAt
    });
};