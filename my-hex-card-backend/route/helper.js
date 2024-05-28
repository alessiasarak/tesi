exports.authenticate = (req, res, next) => {
    // Check if the user is authenticated, for example, by checking if there's a user object in the session
    if (req.session.idUser && req.session.role) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};