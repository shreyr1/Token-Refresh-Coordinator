import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 character long'],
        maxLength: [30, 'Email must not be longer than 30 characters']

    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'Admin'
    },
    refreshToken: {
        type: String,
        default: null,
        select: false, 
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
})

adminSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
};

adminSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { id: this._id, email: this.email, role: this.role, tokenVersion: this.tokenVersion },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
    );
};

adminSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { id: this._id, tokenVersion: this.tokenVersion },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

const admin = mongoose.model('admin', adminSchema);

export default admin;
