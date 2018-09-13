module.exports = {
  authenticateAccount: authenticateAccount,
};

// all users that can log in are hardcoded here. just to keep things simple.
const users = [
  { username: 'test@test.se', password: 'test'},
  { username: 'admin@admin.se', password: 'admin'}
];

/// Fake auth function. Here we should implement a password check against firebase or similar.
async function authenticateAccount(username, password) {
  /* eslint-disable-next-line no-console */
  console.log('authenticateAccount');

  const entity = users.find(u => u.username === username && u.password === password);
  if(entity){
    return true;
  } else {
    return false;
  }

}
