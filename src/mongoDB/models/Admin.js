const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Admin_schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    token: { type: String }
},
{
	versionKey: false,
	timestamps: true
});


Admin_schema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


Admin_schema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('Admin', Admin_schema);
