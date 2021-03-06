const firebase = require('firebase')

//Firebase paths and connection
const referencePath = '/accounts/'
const accountsReference = firebase.database().ref(referencePath)

module.exports = {
  listAccounts: listAccounts,
  createAccount: createAccount,
  deleteAccount: deleteAccount,
  updateAccount: updateAccount,
}

/// function for updating email account.
async function updateAccount(id, email) {
  /* eslint-disable-next-line no-console */
  console.log('updateAccount')

  if (id) {
    const userReference = accountsReference.child(id)
    const snapshot = await userReference.once('value')
    if (snapshot.exists()) {
      userReference.update({ email: email })
      return true
    }
  }
  return false
}

/// function for deleting accounts by id.
async function deleteAccount(id) {
  /* eslint-disable-next-line no-console */
  console.log('deleteAccount')

  if (id) {
    const userReference = accountsReference.child(id)
    const snapshot = await userReference.once('value')
    /// checks so item exists. then deletes it.
    if (snapshot.exists()) {
      userReference.remove()
      return true
    }
  }
  return false
}

/// function that takes no input, and lists all items in firebase
async function listAccounts() {
  /* eslint-disable-next-line no-console */
  console.log('listAccounts')

  const snapshot = await accountsReference.orderByKey().once('value')

  let users = []
  snapshot.forEach(function(data) {
    /// small manipulation for making id as property in item
    const userItem = Object.assign({ id: data.key }, data.val())
    users.push(userItem)
  })
  return users
}

/// function for creating account.
async function createAccount(email) {
  /* eslint-disable-next-line no-console */
  console.log('createAccount')

  const accountRef = await accountsReference.push({
    email: email,
  })

  return accountRef.key
}
