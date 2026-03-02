const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
        return res.status(409).json({ message: "User already exists" });
    }

    const userId = await User.create({
        username,
        email,
        password
    });

    const token = generateToken(userId);

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: userId, username, email }
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
};