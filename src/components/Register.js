import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let userInput = React.createRef(); // React use ref to get input value
  let passInput = React.createRef();
  const navigate = useNavigate();

  const OnClickHandler = (e) => {
    const register = {
      username: `${userInput.current.value}`,
      password: `${passInput.current.value}`,
    };
    axios
      .post("http://localhost:3000/auth/signup", register)
      .then(function (response) {
        navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <div class="field">
                  <label class="label">Username</label>
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
                  <label class="label">Password</label>
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
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
