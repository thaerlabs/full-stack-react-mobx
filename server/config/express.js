/**
 * Express configuration
 *
 * @exports app: configured express instance
 */

import express from 'express';
import ejs from 'ejs';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import expressWinston from 'express-winston';
import config from 'nconf';
import { getTransportsInstance } from './winston';
import passport from 'passport';
import mongoose from 'mongoose';
import MainRouter from '../routes';

const app = express();
const env = app.get('env');

export function init(sessionMiddleware){
  app.locals.env = env;

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.set('appRootPath', path.join(process.cwd(), 'client'));
  app.use(express.static(path.join(process.cwd(), 'client')));

  /**
   * Setup for production only
   */
  if (env === 'production') {
    app.use(morgan('combined'));
  }

  /**
   * Setup for deployed dev and live
   */
  if (env === 'production' || env === 'development') {
    var manifest = JSON.parse(require('fs').readFileSync(path.join(app.get('appRootPath'), 'dist', 'manifest.json')));
    app.locals.manifest = manifest;
  }

  /**
   * Setup for local dev
   */
  if (env === 'local') {
    app.use(morgan('dev'));
    app.locals.BS_DEV_PORT = config.get('BS_DEV_PORT');
  }

  app.locals.getAsset = ((asset) => {
    if (env === 'production' || env === 'development') {
      const manifest = JSON.parse(require('fs').readFileSync(path.join(app.get('appRootPath'), 'dist', 'manifest.json')));
      return (asset) => `${manifest['/dist/' + asset]}`;
    } else {
      return (asset) => `http://localhost:${config.get('WEBPACK_DEV_PORT')}/static/${asset}`;
    }
  })();

  /**
   * Setup view engine EJS
   */
  app.set('views', [
    app.get('appRootPath')
  ]);

  app.set('view engine', 'ejs');
  app.engine('ejs', ejs.renderFile);

  /**
   * compress all requests
   */
  app.use(compression());

  /**
   * parse application/x-www-form-urlencoded
   */
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));

  /**
   * parse application/json
   */
  app.use(bodyParser.json({limit: '50mb'}));

  app.use(methodOverride());

  app.use(cookieParser());

  /**
   * Intialize express session
   */
  app.use(sessionMiddleware);

  /**
   * Initialize Passport
   */
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Mount Application routes
   */
  app.use(MainRouter);

  /**
   * Configure express winston logging
   */
  app.use(expressWinston.errorLogger({
    transports: getTransportsInstance()
  }));

  /**
   * Error handling middleware
   */
  app.use(function handleErrors(err, req, res, next) {

    if (env === 'local') console.log(err.stack)
    else {
      delete err.stack;
    }

    var statusCode = err.output ? err.output.statusCode : 500;
    if (!res.headersSent) {
      res.status(err.status || statusCode).json(err);
    }
  });
}

export function getAppInstance(){
  return app;
}
