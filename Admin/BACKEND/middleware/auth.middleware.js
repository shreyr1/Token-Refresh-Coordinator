import jwt from 'jsonwebtoken';
import admin from '../models/admin.model.js';


export const authAdmin = async(req, res , next) => {
    try{
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                "error" : "Unathorised User"
            })
        }

        try {
            let decode;
            try {
                decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            } catch (err) {
                // Point 5: Sliding window - fall back to previous secret
                if (process.env.JWT_PREVIOUS_ACCESS_SECRET) {
                    try {
                        decode = jwt.verify(token, process.env.JWT_PREVIOUS_ACCESS_SECRET);
                    } catch (prevErr) {
                        throw err; // throw original error if both fail
                    }
                } else {
                    throw err;
                }
            }

            const adminDetail = await admin.findById(decode.id).select("-password"); 

            if(!adminDetail){
                return res.status(401).json({"error" : "User Not Found"});
            }

            if(decode.tokenVersion !== adminDetail.tokenVersion){
                return res.status(401).json({ error : "Session invalidated. Login again."});
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