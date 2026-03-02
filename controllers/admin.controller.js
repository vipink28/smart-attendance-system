const User = require("../models/user.model");
const StudentProfile = require("../models/StudentProfile.model");
const TeacherProfile = require("../models/TeacherProfile.model");

exports.createStudent = async (req, res) => {

    const userId = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "student"
    });

    await StudentProfile.create({
        userId,
        rollNumber: req.body.rollNumber,
        phone: req.body.phone,
        dob: req.body.dob,
        admissionYear: req.body.admissionYear
    });

    res.status(201).json({
        message: "Student created successfully",
        studentId: userId
    });
};


exports.createTeacher = async (req, res) => {

    const userId = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "teacher"
    });

    await TeacherProfile.create({
        userId,
        phone: req.body.phone,
        dob: req.body.dob,
        qualification: req.body.qualification
    });

    res.status(201).json({
        message: "Teacher created successfully",
        teacherId: userId
    });
};