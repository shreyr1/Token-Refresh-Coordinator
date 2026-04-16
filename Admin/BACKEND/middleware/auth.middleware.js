import jwt from 'jsonwebtoken';
import admin from '../models/admin.model.js';


export const authAdmin = async(req, res , next) => {
    try{
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        console.log("Auth attempt with token:", token ? "Token present" : "No token found");

        if(!token){
            return res.status(401).json({
                "error" : "Unathorised User"
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully for adminId:", decode.adminId);

            const adminDetail = await admin.findById(decode.adminId).select("-password"); 
            
            if(!adminDetail){
                console.log("Admin not found in DB for ID:", decode.adminId);
                return res.status(401).json({"error" : "User Not Found"});
            }

            req.admin = adminDetail;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token here" });
        }

    }catch(err){
        return res.status(400).json({"error" : "Unauthorised Admin"});
    }
}