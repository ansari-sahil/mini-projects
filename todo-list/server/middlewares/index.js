const { verifyToken } = require("../utils/auth");

module.exports.isAuthorised = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({
                message: 'Unauthorized',
                success: false
            });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        });
    }
};
