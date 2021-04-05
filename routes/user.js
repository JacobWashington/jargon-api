const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// routes
router.post('/register', ctrl.User.register);
router.post('/login', ctrl.User.login);
router.post('/update',passport.authenticate('jwt', { session: false }), ctrl.User.updateUser);
router.get('/:id', ctrl.User.show)

// exports
module.exports = router;