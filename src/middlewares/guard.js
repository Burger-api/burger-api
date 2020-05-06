import * as constants from '../constants';

const default_options = {
  auth: constants.AUTH,
  requested_status: 'customer'
};

/**
 * @returns {import('express').RequestHandler}
 */
export default (options = default_options) => {
  options = {
    ...default_options,
    ...(options || {}),
  };

  const need_auth = options.auth === constants.AUTH;

  return (req, res, next) => {
    if (need_auth !== req.authed) {
      if (req.authed) {
        return res.status(403).end();
      } else {
        return res.status(401).end();
      }
    }

    if(req.user_status !== 'admin'){
      if(options.requested_status !== req.user_status){
        return res.status(403).end();
      }
    }

    next();
  }
}
