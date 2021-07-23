const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const app = express()

const authRoutes = require('./src/routes/auth')
const blogRoutes = require('./src/routes/blog')
// const { static } = require('express')

// Tentukan folder penyimpanan
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

// filter file yang boleh di upload
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else{
        cb(null, false)
    }
}

app.use(cors())
app.use(bodyParser.json()) // menerima JSON
app.use('/images/', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('images'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data})
})

mongoose.connect('mongodb+srv://ty:N4CaHzF0IYlwcilk@cluster0.jn99b.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log('Connection Success', port))
})
.catch(err => console.log('err', err))