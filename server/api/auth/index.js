'use strict';

import {Router} from 'express';
import passport from 'passport';
import Boom from 'boom';
import jwt from 'jsonwebtoken';
import config from 'nconf';

/**
 * Setting up authentication routes
 */
var router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user.toObject(), config.get('JWT_SECRET'));

  res.json({
    user: req.user,
    token
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
