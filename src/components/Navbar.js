import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          Task management app
          <button
            className="button"
            style={{
              float: "right",
              color: "white",
              background: "#08d4b4",
              border: "0.5vh solid white",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </p>
        <p className="subtitle">ReactJS 17.0.2 + NestJS</p>
      </div>
    </section>
  );
};

export default Navbar;
