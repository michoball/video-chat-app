import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Navigation from "./pages/nav/Navigation";
import RoomForm from "./pages/roomForm/RoomForm";
import Room from "./pages/room/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authentication />} />
        <Route path="lobby" element={<RoomForm />} />
        <Route path="room/:roomId" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default App;
