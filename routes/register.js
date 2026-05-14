var express = require('express');
var User = require('../models/User')
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('register', { error: {} });
});

router.post('/', async function (req, res, next) {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).render('register', {
                error: {
                    passwordsDontMatch: 1
                }
            });
        }

        await User.create({ email, password });

        return res.redirect('/');
    } catch (err) {
        var error = {};

        error.emailTaken = err.code === 11000;
        
        error.passwordTooShort = err.errors?.password;

        return res.status(400).render('register', { error });
    }
});

module.exports = router;