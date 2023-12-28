const connection = require('./db');
const Lesson = require('./Lesson');

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

  static async getSubmissionAssignmentById(assignmentID, studentID) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM submissions WHERE assignmentID = ? AND studentID = ?',
            [assignmentID, studentID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            }
        );
    });
  }

  static async getAllSubmissionAssignmentById(assignmentID) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM submissions WHERE assignmentID = ?',
            [assignmentID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
  }

  static async getSubmission(submissionID) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM submissions WHERE submissionID = ?',
            [submissionID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            }
        );
    });
  }

  static async getSubmissionStudents(studentIDs) {
    const promises = studentIDs.map(studentID => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM users WHERE userID = ?',
                [studentID],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0]);
                    }
                }
            );
        });
    });

    try {
        const submissionStudents = await Promise.all(promises);
        return submissionStudents;
    } catch (error) {
        throw error;
    }
}


  static async submissionsByStudent(submissionData) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE submissions SET noi_dung = ?, ngay_nop = ? WHERE submissionID = ?',
        [submissionData.noi_dung, submissionData.ngay_nop, submissionData.submissionID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static async getStudentbySubmission(userID) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE userID = ?',
        [userID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }


  static async getSubmissionByID(assignmentID) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM submissions WHERE assignmentID = ?',
        [assignmentID],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static async updateMark(submissionID, diem_so) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE submissions SET diem_so = ? WHERE submissionID = ?',
        [diem_so, submissionID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }


  


  // static async createAssignment(assignmentData) {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'INSERT INTO assignments (courseID, assignmentName, deadline, ngay_tao, content, documentPath, userID) VALUES (?, ?, ?, ?, ?, ?, ?)',
  //       [assignmentData.courseID, assignmentData.assignmentName, assignmentData.deadline, assignmentData.ngay_tao, assignmentData.content, assignmentData.documentPath, assignmentData.userID],
  //       (err, results) => {
  //         if (err) reject(err);
  //         const assignmentID = results.insertId;
  //         resolve({ assignmentID, ...assignmentData });
  //       }
  //     );
  //   });
  // }

//   static async createAssignment(assignmentData) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const result = connection.query(
//                 'INSERT INTO assignments (courseID, assignmentName, deadline, ngay_tao, content, documentPath, userID) VALUES (?, ?, ?, ?, ?, ?, ?)',
//                 [assignmentData.courseID, assignmentData.assignmentName, assignmentData.deadline, assignmentData.ngay_tao, assignmentData.content, assignmentData.documentPath, assignmentData.userID]
//             );

//             console.log(result);

              // const assignmentID = result.insertId;
//             console.log("assignmentID is" + assignmentID);

            // const enrolledStudents = await new Promise((resolve, reject) => {
            //     connection.query(
            //         'SELECT * FROM enrollments WHERE courseID = ?',
            //         [assignmentData.courseID],
            //         (err, results) => {
            //             if (err) reject(err);
            //             resolve(results);
            //         }
            //     );
            // });

//             console.log(enrolledStudents);

//             for (const student of enrolledStudents) {
//                 await Lesson.createSubmission(assignmentID, student.studentID);
//             }

//             resolve({ assignmentID, ...assignmentData });
//         } catch (err) {
//             reject(err);
//         }
//     });
// }

  static async createAssignment(assignmentData) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO assignments (courseID, assignmentName, deadline, ngay_tao, content, documentPath, userID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [assignmentData.courseID, assignmentData.assignmentName, assignmentData.deadline, assignmentData.ngay_tao, assignmentData.content, assignmentData.documentPath, assignmentData.userID],
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            const assignmentID = result.insertId;
            console.log(assignmentID);

            // Lấy danh sách sinh viên đã tham gia lớp học
            const enrolledStudents = await new Promise((resolve, reject) => {
              connection.query(
                'SELECT * FROM enrollments WHERE courseID = ?',
                [assignmentData.courseID],
                (err, results) => {
                  if (err) reject(err);
                  resolve(results);
                }
              );
            });

            console.log(enrolledStudents);

            const submissionPromises = enrolledStudents.map((student) => {
              return new Promise((resolve, reject) => {
                connection.query(
                  'INSERT INTO submissions (assignmentID, studentID) VALUES (?, ?)',
                  [assignmentID, student.studentID],
                  (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                  }
                );
              });
            });


            await Promise.all(submissionPromises);

            resolve({ assignmentID, ...assignmentData });
          }
        }
      );
    });
  }




  static async getUserAssignments(courseIDs, userID) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM assignments WHERE courseID IN (?)', [courseIDs, userID], (err, results) => {
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
  // static async getTeacherAssignments(courseID, teacherID) {
  //   return new Promise((resolve, reject) => {
  //     connection.query('SELECT * FROM ')
  //   });
  // }

  static async getAssignmentsByCourseID(courseID) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM assignments WHERE courseID = ?',
        [courseID],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

}

module.exports = Assignment;
