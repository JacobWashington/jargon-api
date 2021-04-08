const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.Post.create);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.Post.update);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.Post.destroy);
router.get('/:id', ctrl.Post.show)
router.get('/:uid', ctrl.Post.showByUserId)

// exports
module.exports = router;