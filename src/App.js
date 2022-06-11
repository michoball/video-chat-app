import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Navigation from "./pages/nav/Navigation";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Room from "./pages/room/Room";
import Lobby from "./pages/lobby/Lobby";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authentication />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="lobby" element={<Lobby />} />
          <Route path="room/:roomId" element={<Room />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
