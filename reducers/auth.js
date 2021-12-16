export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
// user has changed it's password... same as logout
export const AUTH_PASSWORD = 'AUTH_PASSWORD'
export const AUTH_REFRESH = 'AUTH_REFRESH'

export const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.token
      }
    case AUTH_PASSWORD:
    case AUTH_LOGOUT:
      return {}
    default:
      return state;
  }
}