const initState = {
  isLogged: false,
  user: {}
}

const userReducer = (state = initState, action) => {
  switch (action.type) {

    case "SIGN_IN":
      return {
        isLogged: action.payload.isLogged,
        user: action.payload.user,
      };
    case "ERROR_SIGN_IN":
      return {
        isLogged: false,
        user: {},
      };
    case "SIGN_OUT":
      return {
        isLogged: action.payload.isLogged,
        user: {},
      };
    default:
      return { ...state };
  }
}

export default userReducer;