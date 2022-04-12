import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bulma/css/bulma.min.css";
import Login from "./components/Login";
import Test from "./components/Test";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import SkipLogin from "./components/SkipLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SkipLogin>
              <Login />
            </SkipLogin>
          }
        />
        <Route path="signup" element={<Register />} />
        <Route path="test" element={<Test />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
