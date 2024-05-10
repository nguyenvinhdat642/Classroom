const Lesson = require('../models/Lesson');

const indexController = {
    getAllCourses: async (req, res) => {
        try {
            const lessons = await Lesson.getAllLessons();
            res.render('index', { lessons });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

};

module.exports = indexController;
