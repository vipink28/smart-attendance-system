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

// GET ALL STUDENTS
exports.getStudents = async (req, res) => {

    const students = await User.findByRole("student");

    res.json(students);
};


// GET SINGLE STUDENT
exports.getStudent = async (req, res) => {

    const user = await User.findById(req.params.id);

    const profile = await StudentProfile.findByUserId(req.params.id);

    res.json({
        ...user,
        profile
    });
};


// UPDATE STUDENT
exports.updateStudent = async (req, res) => {

    const userId = req.params.id;

    await User.updateUser(userId, {
        username: req.body.username,
        email: req.body.email
    });

    await StudentProfile.update(userId, {
        rollNumber: req.body.rollNumber,
        phone: req.body.phone,
        dob: req.body.dob,
        admissionYear: req.body.admissionYear
    });

    res.json({ message: "Student updated" });
};


// DELETE STUDENT
exports.deleteStudent = async (req, res) => {

    const userId = req.params.id;

    await StudentProfile.delete(userId);
    await User.deleteUser(userId);

    res.json({ message: "Student deleted" });
};


// GET ALL TEACHERS
exports.getTeachers = async (req, res) => {

    const teachers = await User.findByRole("teacher");

    res.json(teachers);
};


// GET SINGLE TEACHER
exports.getTeacher = async (req, res) => {

    const user = await User.findById(req.params.id);

    const profile = await TeacherProfile.findByUserId(req.params.id);

    res.json({
        ...user,
        profile
    });
};


// UPDATE TEACHER
exports.updateTeacher = async (req, res) => {

    const userId = req.params.id;

    await User.updateUser(userId, {
        username: req.body.username,
        email: req.body.email
    });

    await TeacherProfile.update(userId, {
        phone: req.body.phone,
        dob: req.body.dob,
        qualification: req.body.qualification
    });

    res.json({ message: "Teacher updated" });
};


// DELETE TEACHER
exports.deleteTeacher = async (req, res) => {

    const userId = req.params.id;

    await TeacherProfile.delete(userId);
    await User.deleteUser(userId);

    res.json({ message: "Teacher deleted" });
};