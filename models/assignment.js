const connection = require('./db');

class Assignment {
  static async getAllAssignments() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM assignments', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async getAssignmentById(assignmentID) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM assignments WHERE assignmentID = ?', [assignmentID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static async createAssignment(assignmentData) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO assignments (courseID, assignmentName, deadline, ngay_tao, content, documentPath, userID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [assignmentData.courseID, assignmentData.assignmentName, assignmentData.deadline, assignmentData.ngay_tao, assignmentData.content, assignmentData.documentPath, assignmentData.userID],
        (err, results) => {
          if (err) reject(err);
          const assignmentID = results.insertId;
          resolve({ assignmentID, ...assignmentData });
        }
      );
    });
  }

  static async getUserAssignments(courseIDs) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM assignments WHERE courseID IN (?)', [courseIDs], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async getAssignmentsByCourse(courseID) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM assignments WHERE courseID = ?', [courseID], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

static async isTeacherOfCourse(teacherID, courseID) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM courses WHERE teacherID = ? AND courseID = ?', [teacherID, courseID], (err, results) => {
            if (err) reject(err);
            resolve(results.length > 0);
        });
    });
}

static async getAssignmentsByTeacher(teacherID, courseID) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM assignments WHERE userID = ? AND courseID = ?',
            [teacherID, courseID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
}


static async getStudentAssignments(courseID, studentID) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM assignments WHERE courseID = ? AND userID = ?',
            [courseID, studentID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
}

static async getAllAssignments() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM assignments', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
}

module.exports = Assignment;
