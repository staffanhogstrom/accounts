const express = require('express');
const sessionService = require('./sessionService');
const jwtService = require('../jwt/jwtService');

// Lets create a router, and map valid routes
const router = express.Router();

/// default router for authentication. handles incoming post with validation
router.post('/', validator, async (req, res, next) => {
  try {
    //add validation
    if (await sessionService.authenticateAccount(req.body.email, req.body.password)) {

      const sessionToken = jwtService.getJWTSessionToken(req.body.email);
      //const sessionToken = await accountService.getSessionToken();
      //res.setHeader('Set-Cookie', 'access-token=' + sessionToken + '; HttpOnly');
      res.cookie('access-token',sessionToken, { maxAge: 900000, httpOnly: true });
      res.status(200).send({ token: sessionToken, message: 'Authenticated' });
    } else {
      res.status(401).send();
    }
    next();
  } catch (exception) {
    next(exception);
  }
});


/// validation function for incoming auth request. uses express-validator for checking validity of email
function validator(req, res, next) {

  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Invalid password! Must be between 4-20 characters').len(4, 20);

  var errors = req.validationErrors(true);
  if (errors) {
    /// errors found, so send error code and info back to client.
    res.status(400).send({ errors: errors });
  }
  else {
    next();
  }
}

module.exports = router;