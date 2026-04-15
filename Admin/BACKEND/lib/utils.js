import jwt from 'jsonwebtoken'


export const generateToken = (admin, res) => {
    // Standardize token structure with User backend
    const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role, tokenVersion: admin.tokenVersion },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    )

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        // domain: ".yourdomain.com" // UNCOMMENT THIS FOR SUBDOMAIN DEPLOYMENT
    });

    return token;
};