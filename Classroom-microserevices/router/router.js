const app = express();

const requestQueue = [];

function addToQueue(request) {
    requestQueue.push(request);
    console.log('Yêu cầu đã được thêm vào hàng đợi.');
}

function processQueue() {
    console.log(requestQueue.bodyData)
    if (requestQueue.length > 0) {
        const request = requestQueue.shift();
        console.log('Xử lý yêu cầu:', request);
        handleRequest(request);
        process.nextTick(processQueue);
    } else {
        console.log('Hàng đợi đã rỗng.');
    }
}



function handleRequest(request) {
    switch (request.endpoint) {
        case '/assignments/create-assignment':
            assignmentController.getCreateAssignment(request.requestData);
            break;
        case '/assignments/detail/submit/:assignmentID':
            submissionController.createSubmission({ assignmentID: request.requestData.assignmentID, bodyData: request.requestData.bodyData});
            break;
        default:
            console.log('Không tìm thấy endpoint phù hợp.');
    }
}

app.use(express.json());

const assignmentController = require('./API/assignmentController');
const submissionController = require('./API/submissionController');

// Routes
app.get('/assignments', assignmentController.getAssignment);
app.get('/assignments/:courseID', assignmentController.getCourseID);
app.post('/assignments/create-assignment', (req, res) => {
    const requestData = req.body;
    addToQueue({
        endpoint: '/assignments/create-assignment',
        requestData: requestData
    });
    res.send('Yêu cầu đã được thêm vào hàng đợi.');

});
app.get('/assignment/detail/:assignmentID', assignmentController.getAssignmentID);
app.post('/assignments/detail/submit/:assignmentID', (req, res) => {
    const requestData = {
        assignmentID: req.params.assignmentID,
        bodyData: req.body
    };
    addToQueue({
        endpoint: '/assignments/detail/submit/:assignmentID',
        requestData: requestData
    });
    res.send('Yêu cầu submit đã được thêm vào hàng đợi.');
});

app.get('/submission/student/:submissionID', submissionController.getSubmission);
app.get('/submission/math/', submissionController.getMark);

processQueue();
