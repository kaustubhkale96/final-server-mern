const config = require('../../config/auth.config')
const db = require('../../models')

const User = db.user
const Role = db.role

// jwt and bcrypt
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return;
        }
        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    })
                    return;
                }
                user.roles = roles.map(role => role._id)
                user.save(err => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        })
                        return;
                    }
                    res.send({
                        message: 'User resgisterd successfully!'
                    })
                })
            })

        }
        else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({
                        messege: err
                    })
                }
                user.roles = [role._id]
                user.save(err => {
                    if (err) {
                        res.status(500).send({
                            messege: err
                        })
                        return;
                    }
                    res.send({
                        message: 'User resgisterd successfully'
                    })
                })
            })
        }
    })
}