const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (req.user.role !== requiredRole) {
        console.log(req.user.role);
        console.log(requiredRole);
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};

module.exports = roleMiddleware;
