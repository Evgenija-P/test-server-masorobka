const { Unauthorized } = require('http-errors');
const Admin = require('../mongoDB/models/Admin');

module.exports = async function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw new Unauthorized('No authorization in header');
        }
        const [bearer, token] = req.headers.authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw new Unauthorized('Invalid authorization format');
        }
        if (!token) {
            throw new Unauthorized('Token not found');
        }
        const user = await Admin.findOne({ token });
        if (!user) {
            throw new Unauthorized('User not authorized');
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(error.status || 401).json({ message: error.message });
    }
};
