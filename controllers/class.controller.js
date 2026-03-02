const Class = require("../models/class.model");

exports.createClass = async (req, res) => {

    const classId = await Class.create(req.body.name);

    res.status(201).json({
        message: "Class created",
        classId
    });
};


exports.assignTeacher = async (req, res) => {

    await Class.assignTeacher(req.body.classId, req.body.teacherId);

    res.json({ message: "Teacher assigned" });
};


exports.addStudent = async (req, res) => {

    await Class.addStudent(req.body.classId, req.body.studentId);

    res.json({ message: "Student added" });
};


exports.removeStudent = async (req, res) => {

    await Class.removeStudent(req.body.classId, req.body.studentId);

    res.json({ message: "Student removed" });
};


exports.getAllClasses = async (req, res) => {

    const classes = await Class.getAll();

    res.json(classes);
};