export class Auth {
  login (user, store) {
    store.registerModule('login', { state: { user } })
  }
}
