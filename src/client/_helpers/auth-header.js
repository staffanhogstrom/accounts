export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    //forcing in a simpler way right now.
    return { 'x-access-token': user.token }
    //this is correct way.
    //return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {}
  }
}
