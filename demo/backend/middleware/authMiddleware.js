import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { _id, role, etc. }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


const managerMiddleware = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied. Manager only." });
  }
  next();
};

export { authMiddleware, managerMiddleware };
