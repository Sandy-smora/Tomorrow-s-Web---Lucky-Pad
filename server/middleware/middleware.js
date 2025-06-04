import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Authorization header missing or malformed" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: "Invalid or missing token payload" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const newUser = { name: user.name, id: user._id }
        req.user = newUser
        
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(500).json({ success: false, message: "Please login again" });
    }
};

export default middleware;
