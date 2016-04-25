/**
 * Main application routes
 */

'use strict';
import { Router } from 'express';

const router = Router();

/**
 * /api/ routes
 */
router.use('/api/', require('./api'));

/**
 * render client/index.ejs
 */
router.get('/*', function(req, res) {
  res.render('index');
});

module.exports = router;
