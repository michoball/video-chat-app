import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Navigation from "./pages/nav/Navigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
