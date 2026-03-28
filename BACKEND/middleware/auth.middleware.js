import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

export const authUser = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];


        if(!token){
            return res.status(401).json({
                "error" : "Unauthorised User"
            })
        }


        try{
            const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            const userDetail = await user.findById(decode.id).select("-password");

            if(!userDetail){
                return res.status(401).json({"error" : "User Not Found"});
            }

            if(decode.tokenVersion !== userDetail.tokenVersion){
                return res.status(401)({ error : "Session invalidated. Login again."});
            }

            req.user = userDetail;
            next();
        }catch(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }

            console.log(err.message);

            return res.status(401).json({ message: "Invalid token here" });
        }
    }catch(err){
        console.log(err.message)
        return res.status(400).json({"error" : "Unauthorised User"})
    }
}