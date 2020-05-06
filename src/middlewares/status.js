import * as tokens from '../models/tokens'
import * as users from '../models/users';

/**
 * @type {import('express').RequestHandler} 
 */
export default async (req, res, next) => {
  if(req.token){
    const user = await users.find_by_token(req.token)
    req.user_status = user.status
  } else {
    req.user_status = 'customer'
  }
    

  next()
}
