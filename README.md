# Smart Attendance System (Backend)

This is the backend API for the **Smart Attendance System** built with **Node.js, Express, and MySQL**.
The system allows administrators to manage teachers, students, and classes, while teachers can generate QR codes for attendance and students can mark their attendance.

---

# Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt (Password Hashing)

---

# Base URL

```
http://localhost:5000/api
```

---

# Authentication

Protected routes require a JWT token.

Add the following header:

```
Authorization: Bearer <token>
```

---

# Roles

The system supports three user roles:

```
admin
teacher
student
```

Each role has different permissions.

---

# Authentication Routes

## Register User

**POST**

```
/api/auth/signup
```

### Request Body

```json
{
  "username": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": 1,
    "username": "John",
    "email": "john@example.com"
  }
}
```

---

## Login

**POST**

```
/api/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": 1,
    "username": "John",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

# Admin Routes

All admin routes require:

* Authentication
* Role = **admin**

---

## Create Student

**POST**

```
/api/admin/students
```

### Request Body

```json
{
  "username": "Student1",
  "email": "student1@example.com",
  "password": "123456",
  "rollNumber": "101",
  "phone": "9876543210",
  "dob": "2005-05-01",
  "admissionYear": 2023
}
```

### Functionality

Creates:

* User with role **student**
* Student profile

---

## Get All Students

**GET**

```
/api/admin/students
```

Returns list of all students.

---

## Get Single Student

**GET**

```
/api/admin/students/:id
```

Returns student details along with profile information.

---

## Update Student

**PUT**

```
/api/admin/students/:id
```

### Request Body

```json
{
  "username": "Updated Name",
  "email": "updated@example.com",
  "rollNumber": "102",
  "phone": "9999999999",
  "dob": "2005-05-01",
  "admissionYear": 2023
}
```

Updates user and student profile.

---

## Delete Student

**DELETE**

```
/api/admin/students/:id
```

Deletes:

* Student profile
* User account

---

## Create Teacher

**POST**

```
/api/admin/teachers
```

### Request Body

```json
{
  "username": "Teacher1",
  "email": "teacher@example.com",
  "password": "123456",
  "phone": "9998887777",
  "dob": "1990-01-01",
  "qualification": "MSc Mathematics"
}
```

Creates:

* User with role **teacher**
* Teacher profile

---

## Get All Teachers

**GET**

```
/api/admin/teachers
```

---

## Get Single Teacher

**GET**

```
/api/admin/teachers/:id
```

---

## Update Teacher

**PUT**

```
/api/admin/teachers/:id
```

### Request Body

```json
{
  "username": "Updated Teacher",
  "email": "teacher@example.com",
  "phone": "9999999999",
  "dob": "1990-01-01",
  "qualification": "PhD"
}
```

---

## Delete Teacher

**DELETE**

```
/api/admin/teachers/:id
```

---

# Class Routes

Accessible by **admin and teacher**.

---

## Create Class

**POST**

```
/api/classes
```

### Request Body

```json
{
  "name": "Maths 10A"
}
```

---

## Assign Teacher to Class

**POST**

```
/api/classes/assign-teacher
```

### Request Body

```json
{
  "classId": 1,
  "teacherId": 5
}
```

---

## Add Student to Class

**POST**

```
/api/classes/add-student
```

### Request Body

```json
{
  "classId": 1,
  "studentId": 10
}
```

---

## Remove Student from Class

**POST**

```
/api/classes/remove-student
```

---

## Get All Classes

**GET**

```
/api/classes
```

---

# Session Routes (QR Attendance)

Accessible by **teachers**.

---

## Create QR Session

**POST**

```
/api/sessions
```

### Request Body

```json
{
  "classId": 1,
  "duration": 5,
  "lat": 28.7041,
  "lng": 77.1025
}
```

### Functionality

Creates a QR attendance session.

Returns:

```
qrToken
expiresAt
```

---

# Attendance Routes

Accessible by **students**.

---

## Mark Attendance

**POST**

```
/api/attendance
```

### Request Body

```json
{
  "qrToken": "token_from_qr",
  "lat": 28.7041,
  "lng": 77.1025
}
```

### System Checks

* QR token validity
* Session expiry
* Student enrolled in class
* Location verification

If all checks pass, attendance is recorded.

---

# Middleware

## protect

Verifies JWT token and attaches user to request.

```
req.user
```

---

## authorize

Restricts access based on user roles.

Example:

```
authorize("admin")
```

---

# Database Tables

Main tables used:

```
users
student_profiles
teacher_profiles
classes
class_students
sessions
attendance
```

---

# Running the Project

Install dependencies:

```
npm install
```

Start the server:

```
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

# Project Structure

```
controllers/
models/
routes/
middlewares/
config/
utils/
app.js
server.js
```

---

# Author

Smart Attendance System for teaching **Node.js + React** full-stack development.
