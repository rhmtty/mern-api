const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BlogPost = new schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Object,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose('BlogPost', BlogPost);