// models/studentProfile.model.js
const db = require("../config/db");

const StudentProfile = {

    async create(data) {
        const [result] = await db.query(
            `INSERT INTO student_profiles
            (user_id, roll_number, phone, dob, admission_year)
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.userId,
                data.rollNumber,
                data.phone,
                data.dob,
                data.admissionYear
            ]
        );

        return result.insertId;
    },

    async findByUserId(userId) {
        const [rows] = await db.query(
            `SELECT * FROM student_profiles WHERE user_id = ?`,
            [userId]
        );

        return rows[0];
    },
    async update(userId, data) {
        await db.query(
            `UPDATE student_profiles
         SET roll_number = ?, phone = ?, dob = ?, admission_year = ?
         WHERE user_id = ?`,
            [
                data.rollNumber,
                data.phone,
                data.dob,
                data.admissionYear,
                userId
            ]
        );
    },

    async delete(userId) {
        await db.query(
            "DELETE FROM student_profiles WHERE user_id = ?",
            [userId]
        );
    }

};

module.exports = StudentProfile;