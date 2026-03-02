// models/session.model.js
const db = require("../config/db");

const Session = {

    async create(data) {
        const [result] = await db.query(
            `INSERT INTO sessions
            (class_id, teacher_id, qr_token, expires_at, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.classId,
                data.teacherId,
                data.qrToken,
                data.expiresAt,
                data.lat,
                data.lng
            ]
        );

        return result.insertId;
    },

    async findByQrToken(qrToken) {
        const [rows] = await db.query(
            `SELECT * FROM sessions WHERE qr_token = ?`,
            [qrToken]
        );

        return rows[0];
    },

    async deactivate(sessionId) {
        await db.query(
            `UPDATE sessions SET is_active = false WHERE id = ?`,
            [sessionId]
        );
    }

};

module.exports = Session;