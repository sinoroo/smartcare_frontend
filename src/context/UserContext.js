import React from "react";
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}


export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################


function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    const loginbody = {username:login, password:password};
    axios('http://localhost:8080/v1/signin',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: loginbody
    })
    .then(function (response){
        if( response){
          console.log(response);
          const responseData = response['data'];
          const responseBody = responseData['data'];
          if(responseBody){
                  
                  console.log("Success");
                  localStorage.setItem('username', responseBody['username']);
                  localStorage.setItem('accessToken', responseBody['accessToken']);
                  localStorage.setItem('refreshToken', responseBody['refreshToken']);
                  localStorage.setItem('role', responseBody['role']);
                  console.log(localStorage.getItem('username'));
                  console.log(localStorage.getItem('accessToken'));
                  console.log(localStorage.getItem('refreshToken'));

                  setTimeout(() => {
                    localStorage.setItem('id_token', 1)
                    setError(null)
                    setIsLoading(false)
                    dispatch({ type: 'LOGIN_SUCCESS' })
              
                    history.push('/app/dashboard')
                  }, 2000);
          }else{
              //swal("Failed", response.msg, "error");
              console.log("Error");
              dispatch({ type: "LOGIN_FAILURE" });
              setError(true);
              setIsLoading(false);
          }
        }
    })
    .catch((err) => {
        if( err.response){
            const {status, config} = err.response;

            if(status === 404) {
                console.log(`${config.url} not found`);
            }

            if(status === 500) {
                console.log("Server error");
            }
        } else if (err.request){
            console.log("Error", err.message);
        } else {
            console.log("Error", err.message);
        }
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);

    });
  } else {
    console.log("Error !!!!!!!!");
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
