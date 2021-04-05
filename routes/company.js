const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');


// routes
router.post('/',passport.authenticate('jwt', { session: false }), ctrl.Company.create);
router.post('/:id',passport.authenticate('jwt', { session: false }), ctrl.Company.update);
router.post('/:id',passport.authenticate('jwt', { session: false }), ctrl.Company.destroy);
router.get('/:id', ctrl.Company.show);
router.get('/', ctrl.Company.index);

// exports
module.exports = router;