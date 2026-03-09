const db = require("../config/db");

const Attendance = {

    async markAttendance(data) {
        const [result] = await db.query(
            `INSERT IGNORE INTO attendance
        (session_id, class_id, student_id)
        VALUES (?, ?, ?)`,
            [data.sessionId, data.classId, data.studentId]
        );

        return result.affectedRows;
    },

    async findBySession(sessionId) {
        const [rows] = await db.query(
            `SELECT a.*, u.username AS student_name
             FROM attendance a
             JOIN users u ON a.student_id = u.id
             WHERE session_id = ?`,
            [sessionId]
        );
        return rows;
    },

    async findByStudent(studentId) {
        const [rows] = await db.query(
            `SELECT a.*, c.name AS class_name
             FROM attendance a
             JOIN classes c ON a.class_id = c.id
             WHERE student_id = ?`,
            [studentId]
        );
        return rows;
    },

    async findByClass(classId) {
        const [rows] = await db.query(
            `SELECT a.*, u.username AS student_name
             FROM attendance a
             JOIN users u ON a.student_id = u.id
             WHERE a.class_id = ?`,
            [classId]
        );
        return rows;
    },

    async studentSummary(studentId) {
        const [rows] = await db.query(
            `SELECT 
                c.name AS class_name,
                COUNT(a.id) AS total_attendance
             FROM attendance a
             JOIN classes c ON a.class_id = c.id
             WHERE a.student_id = ?
             GROUP BY c.name`,
            [studentId]
        );

        return rows;
    },
    async attendancePercentage(studentId) {
        const [rows] = await db.query(
            `SELECT 
            c.id AS class_id,
            c.name AS class_name,
            COUNT(a.id) AS attended_sessions,
            (
                SELECT COUNT(s.id)
                FROM sessions s
                WHERE s.class_id = c.id
            ) AS total_sessions,
            ROUND(
                (COUNT(a.id) /
                (
                    SELECT COUNT(s.id)
                    FROM sessions s
                    WHERE s.class_id = c.id
                )) * 100, 2
            ) AS attendance_percentage
        FROM classes c
        LEFT JOIN attendance a 
            ON a.class_id = c.id AND a.student_id = ?
        GROUP BY c.id`,
            [studentId]
        );

        return rows;
    },

    async classAttendanceReport(sessionId) {
        const [rows] = await db.query(
            `SELECT 
            u.id AS student_id,
            u.username,
            CASE 
                WHEN a.id IS NULL THEN 'Absent'
                ELSE 'Present'
            END AS attendance_status
        FROM class_students cs
        JOIN users u ON cs.student_id = u.id
        JOIN sessions s ON s.class_id = cs.class_id
        LEFT JOIN attendance a 
            ON a.student_id = u.id 
            AND a.session_id = s.id
        WHERE s.id = ?`,
            [sessionId]
        );

        return rows;
    }

};

module.exports = Attendance;