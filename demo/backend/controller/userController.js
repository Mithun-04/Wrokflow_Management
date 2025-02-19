import userService from "../service/userService.js";

const getUserName = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await userService.getUserByToken(token);

        if (!user) {
            return res.status(404).json({ error: "UserNotFound" });
        }

        res.json({ username: user.name });
    } catch (e) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default getUserName;
