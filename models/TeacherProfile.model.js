// models/teacherProfile.model.js
const db = require("../config/db");
const TeacherProfile = {

    async create(data) {
        const [result] = await db.query(
            `INSERT INTO teacher_profiles
            (user_id, phone, dob, qualification)
            VALUES (?, ?, ?, ?)`,
            [
                data.userId,
                data.phone,
                data.dob,
                data.qualification
            ]
        );

        return result.insertId;
    },

    async findByUserId(userId) {
        const [rows] = await db.query(
            `SELECT * FROM teacher_profiles WHERE user_id = ?`,
            [userId]
        );

        return rows[0];
    },
    async update(userId, data) {
        await db.query(
            `UPDATE teacher_profiles
         SET phone = ?, dob = ?, qualification = ?
         WHERE user_id = ?`,
            [
                data.phone,
                data.dob,
                data.qualification,
                userId
            ]
        );
    },

    async delete(userId) {
        await db.query(
            "DELETE FROM teacher_profiles WHERE user_id = ?",
            [userId]
        );
    }

};

module.exports = TeacherProfile;