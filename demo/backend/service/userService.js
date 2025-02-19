import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getUserByToken = async (token) => {
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        return user;
    } catch (error) {
        return null;
    }
};

export default { getUserByToken };
