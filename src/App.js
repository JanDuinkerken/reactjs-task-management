import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.min.css';
import Login from './components/Login';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='test' element={<Test />}/>
      </Routes>
    </Router>
  );
}

export default App;
