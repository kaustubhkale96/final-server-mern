const db = require('../models')

const ROLES = db.Roles
const User = db.user

checkDuplicateUsernameorEmail = (req, res, next) => {
    // Uername
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                })
                return;
            }
            if (user) {
                res.status(400).send({
                    messege: 'Failed! Username already exists'
                })
                return;
            }
        })
    // Email
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                })
                return;
            }
            if (user) {
                res.status(400).send({
                    messege: 'Failed! Email already exists'
                })
                return;
            }
            next()
        })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameorEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
