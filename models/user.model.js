// models/user.model.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const [result] = await db.query(
            `INSERT INTO users (username, email, password, role)
             VALUES (?, ?, ?, ?)`,
            [data.username, data.email, hashedPassword, data.role || "admin"]
        );

        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    },


    async findById(id) {
        const [rows] = await db.query(
            "SELECT id, username, email, role FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    async findByRole(role) {
        const [rows] = await db.query(
            "SELECT id, username, email, role FROM users WHERE role = ?",
            [role]
        );
        return rows;
    },

    async updateUser(id, data) {
        await db.query(
            `UPDATE users 
         SET username = ?, email = ?
         WHERE id = ?`,
            [data.username, data.email, id]
        );
    },

    async deleteUser(id) {
        await db.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
    },

    async comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compare(inputPassword, hashedPassword);
    },
    async getAdminStats() {
        const [[students]] = await db.query(
            "SELECT COUNT(*) AS total_students FROM users WHERE role='student'"
        );

        const [[teachers]] = await db.query(
            "SELECT COUNT(*) AS total_teachers FROM users WHERE role='teacher'"
        );

        const [[classes]] = await db.query(
            "SELECT COUNT(*) AS total_classes FROM classes"
        );

        const [[sessions]] = await db.query(
            "SELECT COUNT(*) AS total_sessions FROM sessions"
        );

        const [[todayAttendance]] = await db.query(
            `SELECT COUNT(*) AS today_attendance
         FROM attendance
         WHERE DATE(created_at) = CURDATE()`
        );

        return {
            students: students.total_students,
            teachers: teachers.total_teachers,
            classes: classes.total_classes,
            sessions: sessions.total_sessions,
            todayAttendance: todayAttendance.today_attendance
        };
    }
};

module.exports = User;