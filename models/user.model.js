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

    async comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compare(inputPassword, hashedPassword);
    }
};

module.exports = User;