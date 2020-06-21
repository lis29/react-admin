
const USER_KEY = "USER_KEY"
export default {
  memory_user: null,
  saveUser(user) {
    let userStr
    if ('string' === typeof user) {
      this.memory_user = JSON.parse(user)
      userStr = user
    } else {
      this.memory_user = user
      userStr = JSON.stringify(user)
    }
    localStorage.setItem(USER_KEY, userStr)
  },
  getUser() {
    if (!this.memory_user) {
      const localUserInfo = localStorage.getItem(USER_KEY)
      if ('string' === typeof localUserInfo) {
        this.memory_user = JSON.parse(localUserInfo)
      } else {
        this.memory_user = localUserInfo
      }
    }
    return this.memory_user
  },
  removeUser() {
    this.memory_user = null
    localStorage.removeItem(USER_KEY)
  }
}
