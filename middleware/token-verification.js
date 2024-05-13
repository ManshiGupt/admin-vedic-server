import jwt from 'jsonwebtoken';

//before any api hit
export const validateTokenForApi = (req, res, next) => {

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract token value
    const token = authHeader.slice(7); // Remove "Bearer " prefix

    try {
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user information to request object
        req.user = decoded.user;

        // Move to the next middleware or route handler
        next();
        
    } catch (error) {

        console.error('Error validating token:', error);

        // Handle other types of errors
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

//before route
export const validateTokenForRoute = (req, res ) => {
    
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract token value
    const token = authHeader.slice(7); // Remove "Bearer " prefix

    try {
        
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({ message: 'Verified' });
        
    } catch (error) {

        console.error('Error validating token:', error);

        // Handle other types of errors
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
