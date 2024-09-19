const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token =
            // req.body.token ||
            req.cookies.token ||
            req.headers.authorization.split(" ")[1];
        if (!token) {
            res.status(404).json({
                message: "No token found"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;


    } catch (error) {
        return res.status(401).json({
            message: `Token is not valid, ${error.message}`
        });

    }
    next();
}
const isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType === 'Student') {
            return next();
        }
        // If the user is not an instructor, return a 403 response
        return res.status(403).json({
            message: "You are not an Student"
        });
    } catch (error) {
        return res.status(403).json({
            message: error.message
        });
    }
}
const isInstructor = async (req, res, next) => {
    try {
        // Check if the user has the 'Instructor' account type
        if (req.user.accountType === 'Instructor') {
            console.log("type:", req.user.accountType);
            return next(); // Proceed to the next middleware or route handler
        }

        // If the user is not an instructor, return a 403 response
        return res.status(403).json({
            message: error.message
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            message: "An error occurred while checking the user account type",
            error: error.message
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType === 'Admin') {
            return next();

        }
        // If the user is not an Admin, return a 403 response
        return res.status(403).json({
            message: "You are not an Admin"
        });
    } catch (error) {
        return res.status(403).json({
            message: error.message
        });
    }
}
module.exports = { auth, isStudent, isInstructor, isAdmin };