import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import User from "./pages/User";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
