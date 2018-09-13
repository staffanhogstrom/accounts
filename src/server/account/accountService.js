const firebase = require('firebase');

//Firebase paths and connection
const referencePath = '/accounts/';
const accountsReference = firebase.database().ref(referencePath);

module.exports = {
  listAccounts: listAccounts,
};

/// function that takes no input, and lists all items in firebase
async function listAccounts() {
  console.log('listAccounts');

  const snapshot = await accountsReference.orderByKey().once('value');

  let users = [];
  snapshot.forEach(function (data) {
    /// small manipulation for making id as property in item
    const userItem = Object.assign({ id: data.key }, data.val());
    users.push(userItem);
  });
  return users;
}