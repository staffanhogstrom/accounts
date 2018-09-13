const jwt = require('jsonwebtoken')

const tokenSecret = 'thisisareallysecretsecret'

module.exports = {
  getJWTSessionToken: getJWTSessionToken,
  tokenValidator: tokenValidator,
}

/// function for creating JWT token
function getJWTSessionToken(user) {
  const token = jwt.sign(user, tokenSecret)
  return token
}

/// validator function for validating incoming token.
function tokenValidator(req, res, next) {
  //fetches from a set of possibilities, but we are actually storing token in http only cookie.
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies['access-token']

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: 'Unauthorized access.' })
      }
      req.decoded = decoded
      next()
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    })
  }
}
