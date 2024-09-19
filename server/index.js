const express = require('express');
const app = express();

require('dotenv').config()

const port = 3000;
const connectdb = require('./config/database');
connectdb();
const UserRouter = require('./router/User')
const PaymentRouter = require('./router/Payment')
const CourseRouter = require('./router/Course')
const SectionRouter = require('./router/Section')
const SubSectionRouter = require('./router/SubSection')
const CategoryRouter = require('./router/Category')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { cloudinaryConnect } = require('./utils/cloudinary_config')
cloudinaryConnect()

const fileUploader = require('express-fileupload');
app.use(fileUploader({
    useTempFiles: true,
    tempFileDir: './tmp'  // Where to store the files
}))

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,  // Access-Control-Allow-Credentials: true
    methods: ['GET', 'POST', 'PUT', 'DELETE']  // Access-Control-Allow-Methods: GET, POST, PUT, DELETE
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use('/api/v1', UserRouter)
app.use('/api/v1', PaymentRouter)
app.use('/api/v1', CourseRouter)
app.use('/api/v1', SectionRouter)
app.use('/api/v1', SubSectionRouter)
app.use('/api/v1', CategoryRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(4000, () => {
    console.log(`Server Connected at port ${process.env.PORT}`);
})
app.get('/', () => {
    console.log("<h1>Home page</h1>")
})