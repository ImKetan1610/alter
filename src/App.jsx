import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;
