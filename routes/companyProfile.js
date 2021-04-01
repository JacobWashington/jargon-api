const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// pid (profile id)

// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.CompanyProfile.create);
router.post('/:pid', passport.authenticate('jwt', { session: false }), ctrl.CompanyProfile.update);
router.post('/:pid', passport.authenticate('jwt', { session: false }), ctrl.CompanyProfile.destroy);
router.get('/:pid', ctrl.CompanyProfile.show);
router.get('/', ctrl.CompanyProfile.index);

// exports
module.exports = router;