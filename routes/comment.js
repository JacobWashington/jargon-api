const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// ptid (post id)

// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.Comment.create);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.Comment.update);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.Comment.destroy);
router.get('/:id', ctrl.Comment.show)

// exports
module.exports = router;