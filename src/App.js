import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Navigation from "./pages/nav/Navigation";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Room from "./pages/room/Room";
import Lobby from "./pages/lobby/Lobby";
import { useEffect } from "react";

import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="lobby" element={<Lobby />} />
          <Route path="room/:roomId" element={<Room />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
