import passport from 'passport';
import { Strategy } from 'passport-local';
import Boom from 'boom';
import User from '../models/User';
import bluebird from 'bluebird';

/**
 * Passport configuration
 */
export function init() {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new Strategy(function(username, password, done) {

    bluebird.coroutine(function *(){
      var user = yield User
        .findOne({username: username})
        .populate('role', '_id name menuItems');

      if (!user)
        return done(Boom.badRequest("Invalid username"));

      if (!user.isActive) {
        return done(Boom.forbidden("You access has been blocked."));
      }

      if (!user.authenticate(password)) {
        return done(Boom.badRequest("Invalid password"));
      }

      done(null, user);
    })().catch((err) => {
      done(Boom.wrap(err, 422));
    });
  }));
}
