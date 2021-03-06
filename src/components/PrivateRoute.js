import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function PrivateRoute({ children }) {
  const authenticated = auth();
  return authenticated ? children : <Navigate to="/" />;
}

function auth() {
    let token = localStorage.getItem("token")
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                return false;
            }else{
                return true;
            }
        } else {
           return false;
        }
}

export default PrivateRoute
