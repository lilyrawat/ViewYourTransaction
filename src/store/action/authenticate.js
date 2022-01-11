export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDF5U8guKtrBnMx9H1YOQXfHEnIsLGPwo0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const result = await response.json();
      const error = result.error.message;
      throw new Error(error);
    }
    const result = await response.json();
    console.log(result);
    dispatch({
      type: SIGNUP,
      userID: result.localId,
      token: result.idToken,
      data: result,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDF5U8guKtrBnMx9H1YOQXfHEnIsLGPwo0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const result = await response.json();
      const error = result.error.message;
      throw new Error(error);
    }
    const result = await response.json();
    console.log(result);
    dispatch({ type: LOGIN, userID: result.localId, token: result.idToken });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
