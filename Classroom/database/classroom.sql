-- Tạo cơ sở dữ liệu Classroom
CREATE DATABASE IF NOT EXISTS Classroom;

-- Sử dụng cơ sở dữ liệu Classroom
USE Classroom;

-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    confirmation_code VARCHAR(255)
);

-- Tạo bảng Courses
CREATE TABLE IF NOT EXISTS Courses (
    courseID INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(255) NOT NULL,
    teacherID INT,
    description TEXT,
    bai_tap JSON,
    FOREIGN KEY (teacherID) REFERENCES Users(userID)
);

-- Tạo bảng Enrollments
CREATE TABLE IF NOT EXISTS Enrollments (
    enrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    studentID INT,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    FOREIGN KEY (studentID) REFERENCES Users(userID)
);

-- Tạo bảng Schedules
CREATE TABLE IF NOT EXISTS Schedules (
    scheduleID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    ngay_hoc DATE,
    gio_hoc TIME,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);


-- Tạo bảng Assignments
CREATE TABLE IF NOT EXISTS Assignments (
    assignmentID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    assignmentName VARCHAR(255) NOT NULL,
    deadline DATE,
    diem_so_toi_da INT,
    ngay_tao DATE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

-- Tạo bảng Submissions
CREATE TABLE IF NOT EXISTS Submissions (
    submissionID INT AUTO_INCREMENT PRIMARY KEY,
    assignmentID INT,
    studentID INT,
    noi_dung TEXT,
    ngay_nop DATE,
    diem_so INT,
    FOREIGN KEY (assignmentID) REFERENCES Assignments(assignmentID),
    FOREIGN KEY (studentID) REFERENCES Users(userID)
);

-- Tạo bảng Discussions
CREATE TABLE IF NOT EXISTS Discussions (
    discussionID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    title VARCHAR(255) NOT NULL,
    noi_dung TEXT,
    ngay_tao DATE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

-- Tạo bảng Discussion_Users
CREATE TABLE IF NOT EXISTS Discussion_Users (
    discussionID INT,
    userID INT,
    FOREIGN KEY (discussionID) REFERENCES Discussions(discussionID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Tạo bảng Lectures
CREATE TABLE IF NOT EXISTS Lectures (
    lectureID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    title VARCHAR(255) NOT NULL,
    noi_dung TEXT,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

-- Tạo bảng Announcements
CREATE TABLE IF NOT EXISTS Announcements (
    announcementID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    title VARCHAR(255) NOT NULL,
    noi_dung TEXT,
    ngay_dang DATE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

-- Tạo bảng Instructors
CREATE TABLE IF NOT EXISTS Instructors (
    instructorID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    noi_dung_giang_vien TEXT,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Tạo bảng AdminNotifications
CREATE TABLE IF NOT EXISTS AdminNotifications (
    notificationID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    title VARCHAR(255) NOT NULL,
    noi_dung TEXT,
    ngay_tao DATE,
    loai_thong_bao VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Tạo bảng Grades
CREATE TABLE IF NOT EXISTS Grades (
    gradeID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT,
    studentID INT,
    assignmentID INT,
    diem_so INT,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    FOREIGN KEY (studentID) REFERENCES Users(userID),
    FOREIGN KEY (assignmentID) REFERENCES Assignments(assignmentID)
);