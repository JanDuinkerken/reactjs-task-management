import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let userInput = React.createRef(); // React use ref to get input value
  let passInput = React.createRef();
  const navigate = useNavigate();

  const OnClickHandler = (e) => {
    const login = {
      username: `${userInput.current.value}`,
      password: `${passInput.current.value}`,
    };
    axios
      .post("http://localhost:3000/auth/signin", login)
      .then(function (response) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/test');
      })
      .catch((error) => {
        localStorage.setItem("token", null);
      });
  };
  return (
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <div class="field">
                  <label for="" class="label">
                    Username
                  </label>
                  <div class="control has-icons-left">
                    <input
                      ref={userInput}
                      type="text"
                      placeholder="e.g. Reanu Keeves"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">
                    Password
                  </label>
                  <div class="control has-icons-left">
                    <input
                      ref={passInput}
                      type="password"
                      placeholder="********"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
              </form>
              <div class="field">
                <button class="button is-success" onClick={OnClickHandler}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
