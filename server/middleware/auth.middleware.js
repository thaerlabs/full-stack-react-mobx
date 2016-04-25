import boom from 'boom';

/**
 * Authentication middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  next(boom.unauthorized('you are not authorized'));
}
