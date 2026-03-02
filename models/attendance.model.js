const db = require("../config/db");

const Attendance = {
    async markAttendance(data) {
        const [result] = await db.query(
            `INSERT INTO attendance 
            (session_id, class_id, student_id)
            VALUES (?, ?, ?)`,
            [data.sessionId, data.classId, data.studentId]
        );

        return result.insertId;
    },

    async findBySession(sessionId) {
        const [rows] = await db.query(
            "SELECT * FROM attendance WHERE session_id = ?",
            [sessionId]
        );
        return rows;
    }
};

module.exports = Attendance;