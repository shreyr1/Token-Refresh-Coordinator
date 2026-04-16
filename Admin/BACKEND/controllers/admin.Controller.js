import { validationResult } from 'express-validator';
import jwt, { decode } from "jsonwebtoken";
import mongoose from 'mongoose';
import adminModel from '../models/admin.model.js';
import userModel from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';

export const loginController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({
                "error": "Invalid Credentials"
            })
        }

        const isMatch = await admin.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                "error": "Invalid Credentials"
            })
        }

        const token = generateToken(admin._id, res);

        return res.status(200).json({
            status: "login",
            token: token
        });
    } catch (err) {
        return res.status(400).json({ error: "Invalid User" });
    }

};

export const logoutController = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUsersController = async (req, res) => {
    try {

        const users = await userModel.find({});
        res.status(200).json({ users,token:req.token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};