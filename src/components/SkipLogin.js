import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function SkipLogin({ children }) {
  const authenticated = auth();
  return authenticated ? <Navigate to="dashboard" /> : children;
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

export default SkipLogin;
