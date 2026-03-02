// models/class.model.js
const db = require("../config/db");

const Class = {

    async create(name) {
        const [result] = await db.query(
            "INSERT INTO classes (name) VALUES (?)",
            [name]
        );
        return result.insertId;
    },

    async assignTeacher(classId, teacherId) {
        await db.query(
            "UPDATE classes SET teacher_id = ? WHERE id = ?",
            [teacherId, classId]
        );
    },

    async addStudent(classId, studentId) {
        await db.query(
            `INSERT IGNORE INTO class_students (class_id, student_id)
             VALUES (?, ?)`,
            [classId, studentId]
        );
    },

    async removeStudent(classId, studentId) {
        await db.query(
            `DELETE FROM class_students
             WHERE class_id = ? AND student_id = ?`,
            [classId, studentId]
        );
    },

    async getAll() {
        const [rows] = await db.query(`
            SELECT c.id, c.name,
                   u.username AS teacher_name
            FROM classes c
            LEFT JOIN users u ON c.teacher_id = u.id
        `);
        return rows;
    },

    async isStudentEnrolled(classId, studentId) {
        const [rows] = await db.query(
            `SELECT * FROM class_students
             WHERE class_id = ? AND student_id = ?`,
            [classId, studentId]
        );
        return rows.length > 0;
    }
};

module.exports = Class;