const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        requre: true
    },
    fullname: {
        type: String
    }
}, {timestamps: true});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    }
}, {timestamps: true});

// Encrypts password for every new user
userSchema.pre('save', async function (next) {
    try {
        if(this.isNew){
            const hwd = await bcrypt.hash(this.password, 10);
            this.password = hwd;
        }
    } catch (error) {
        next(error)
    }
});

// decrypts the password and checks for validity
userSchema.methods.isValidPwd = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw createHttpError.InternalServerError(error.message)
    }
}

const User = mongoose.model('user', userSchema);
const Blog = mongoose.model('blog', blogSchema);

module.exports = { User, Blog };