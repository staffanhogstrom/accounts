const express = require('express');
const accountService = require('./accountService');

/// Lets create a router, and map valid routes
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

/// HTTP PUT handler for updating item. similar functionality should also be added for patch so we can be more specific.
router.put('/:id', async (req, res, next) => {
  try {
    //add validation
    if (await accountService.updateAccount(req.params.id, req.body.email)) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
    next();
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

/// handler for HTTP Delete by id. deletes entity if found.
router.delete('/:id', async (req, res, next) => {
  try {
    if (await accountService.deleteAccount(req.params.id)) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
    next();
  } catch (exception) {
    next(exception);
  }
});


module.exports = router;