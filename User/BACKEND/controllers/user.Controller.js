import { validationResult } from 'express-validator';
import * as userServices from '../services/user.services.js';
import userModel from '../models/user.model.js';
import adminModel from '../models/admin.model.js';
import jwt, { decode } from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refreshCookieOptions = {
    httpOnly: true,
    secure: true, 
    sameSite: "lax",
    maxAge: 7*24*60*60*1000,
    path: "/",
    domain: ".tourntravels.online" 
}

const sendAuthResponse = async(account, res) => {
    const accessToken = account.generateAccessToken();
    const refreshToken = account.generateRefreshToken();

    // Dynamically update based on which model we are using
    if (account.constructor.modelName === 'user') {
        await userModel.findByIdAndUpdate(account._id, { refreshToken });
    } else {
        await adminModel.findByIdAndUpdate(account._id, { refreshToken });
    }
    
    if(account._doc?.password) delete account._doc.password;

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    return res.status(200).json({user: account, accessToken});

};



export const createUserController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ error : errors.array()})
    }

    try{
        const user = await userServices.createUser(req.body);
        
        return sendAuthResponse(user, res);

    }catch(error){
        res.status(400).send(error.message);
    }
};

export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()}); 
    }

    try{

        const {email, password} = req.body;

        // Try to find in User collection first
        let account = await userModel.findOne({email}).select('+password');
        
        // If not found in User, try Admin collection
        if (!account) {
            account = await adminModel.findOne({email}).select('+password');
        }

        if(!account){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        const isMatch = await account.isValidPassword(password);

        if(!isMatch){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        return sendAuthResponse(account, res);

    }catch(err){
        return res.status(400).json({error : "Invalid User"})
    }
};

export const getUserInfo = async(req, res) => {
    res.status(200).send({
        user : req.user
    })
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const refreshTokenController = async(req, res) => {
    const incoming = req.cookies?.refreshToken;
    if(!incoming) return res.status(400).json({error : "Refresh token missing"});

    let decoded;
    try {
        decoded = jwt.verify(incoming, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        // Point 5: Sliding window - fall back to previous secret for refresh token
        if (process.env.JWT_PREVIOUS_REFRESH_SECRET) {
            try {
                decoded = jwt.verify(incoming, process.env.JWT_PREVIOUS_REFRESH_SECRET);
            } catch (prevErr) {
                return res.status(401).json({error : "Invalid refresh token"});
            }
        } else {
            return res.status(401).json({error : "Invalid refresh token"});
        }
    }

    // Try finding the user in both collections
    let existingAccount = await userModel.findById(decoded.id).select("+refreshToken");
    if (!existingAccount) {
        existingAccount = await adminModel.findById(decoded.id).select("+refreshToken");
    }

    if(!existingAccount || existingAccount.refreshToken !== incoming){
        return res.status(401).json({error : "Refresh token mismatch"});
    }

    if(decoded.tokenVersion !== existingAccount.tokenVersion){
        return res.status(401).json({error: "Session invalidated. Login again."});
    }

    const newAccessToken = existingAccount.generateAccessToken();
    const newRefreshToken = existingAccount.generateRefreshToken();
    existingAccount.refreshToken = newRefreshToken;
    await existingAccount.save();

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);
    return res.status(200).json({accessToken : newAccessToken});
};

export const logoutController = async(req, res) => {
    // Determine which model to use
    const model = req.user.role === 'Admin' ? adminModel : userModel;
    
    await model.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: null},
        $inc: { tokenVersion: 1},
    });

    res.clearCookie("refreshToken", refreshCookieOptions);
    return res.status(200).json({ message : "Logged out"});
};

export const getRotationLog = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'ROTATION.md');
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Rotation log not found" });
        }
        const data = fs.readFileSync(filePath, 'utf8');
        res.status(200).json({ log: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch rotation log" });
    }
};
