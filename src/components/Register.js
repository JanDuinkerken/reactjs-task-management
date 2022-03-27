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
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left">
                    <input
                      ref={userInput}
                      type="text"
                      placeholder="e.g. Reanu Keeves"
                      className="input"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      ref={passInput}
                      type="password"
                      placeholder="********"
                      className="input"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
              </form>
              <div className="field">
                <button className="button is-success" onClick={OnClickHandler}>
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
