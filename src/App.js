import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Navigation from "./pages/nav/Navigation";
import RoomForm from "./pages/roomForm/RoomForm";
import VideoCall from "./components/VideoCall";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authentication />} />
        <Route path="room" element={<RoomForm />} />
        <Route path="room/:roomId" element={<VideoCall />} />
      </Route>
    </Routes>
  );
}

export default App;
