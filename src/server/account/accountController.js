const express = require('express');
const accountService = require('./accountService');

// Lets create a router, and map valid routes
const router = express.Router();

/// HTTP GET for root path, should list all existing account items.
router.get('/', async (req, res, next) => {
  try {
    const users = await accountService.listAccounts();
    res.status(200).send(users);
  } catch (exception) {
    next(exception);
  }
});

/// HTTP POST 
router.post('/', async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;

    const userKey = await accountService.createAccount(email, username);
    if (userKey) {
      res.send({ status: true, id: userKey, message: 'Data saved successfully.' });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;