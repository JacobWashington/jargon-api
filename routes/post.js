const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// pid (profile id)
// ptid (post id)
// gid (group id)

// routes
router.post('/profile/:pid', passport.authenticate('jwt', { session: false }), ctrl.Post.create);
router.post('/profile/:pid/:ptid', passport.authenticate('jwt', { session: false }), ctrl.Post.update);
router.post('/profile/:pid/:ptid', passport.authenticate('jwt', { session: false }), ctrl.Post.destroy);
router.post('/group/:gid', ctrl.Post.create);
router.post('/group/:gid/:ptid', passport.authenticate('jwt', { session: false }), ctrl.Post.update);
router.get('/:id', ctrl.Post.show)

// exports
module.exports = router;