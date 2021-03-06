// * IMPORT DEPENDENCIES * //
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');
const chekJWT = require('../middlewares/check-jwt');

router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isRestorer = req.body.isRestorer;

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is alredy exist'
            });

        } else {
            user.save();

            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            });

        }
    });
});


/* LOGIN */
router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json ({
                success: false,
                message: 'Authenticated failed, User not found'
            });
        } else if (user) {

            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password'
                });
            } else {
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                });
            }
        }
    });
    

});

/* PROFILE */
router.route('/profile')
    .get(chekJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: "Successful"
            });
        });
    })
/* UPDATE EMAIL, NAME ABD PASSWORD */
    .post(chekJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) return next(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;


            user.isRestorer = req.body.isRestorer;

            user.save();
            res.json({
                success: true,
                message: 'Successfully edited your profile'
            });
        });
    })
/* PELETE PROFILE */
    .delete(chekJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) return next(err);

            user.remove();
            res.json({
                success: true,
                message: 'Successfully deleted your address'
            });
        });
    });
// * UPDATE ADDRESS * //
    router.route('/address')
    .get(chekJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            res.json({
                success: true,
                address: user.address,
                message: "Successful"
            });
        });
    })
    .post(chekJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) return next(err);

            if (req.body.addr1) user.address.addr1 = req.body.addr1;
            if (req.body.addr2) user.address.addr2 = req.body.addr2;
            if (req.body.city) user.address.city = req.body.city;
            if (req.body.state) user.address.state = req.body.state;
            if (req.body.contry) user.address.contry = req.body.contry;
            if (req.body.postalCode) user.address.postalCode = req.body.postalCode;


            user.save();
            res.json({
                success: true,
                message: 'Successfully edited your address'
            });
        });
    })

module.exports = router;

