const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
         

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         
        req.userId = decoded._id;  
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = AuthMiddleware;
