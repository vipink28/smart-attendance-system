const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {

    let token;
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization header not present" })
    }

    if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        delete user.password;
        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}