const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// pid (profile id)

// routes
router.post('/',passport.authenticate('jwt', { session: false }), ctrl.UserProfile.create);
router.post('/:pid', passport.authenticate('jwt', { session: false }), ctrl.UserProfile.update);
router.post('/:pid', passport.authenticate('jwt', { session: false }), ctrl.UserProfile.destroy);
router.get('/:pid', ctrl.UserProfile.show);
router.get('/', ctrl.UserProfile.index);

// exports
module.exports = router;