const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// gid (group id)

// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.Group.create);
router.post('/:gid', passport.authenticate('jwt', { session: false }), ctrl.Group.update);
router.post('/:gid', passport.authenticate('jwt', { session: false }), ctrl.Group.destroy);
router.get('/:id', ctrl.Group.show);
router.get('/', ctrl.Group.index);

// exports
module.exports = router;