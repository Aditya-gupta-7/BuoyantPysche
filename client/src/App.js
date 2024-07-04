import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/settings/Settings";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";




function App() {
  const user=false;
  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/write" element={<Write />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
