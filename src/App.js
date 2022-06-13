import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Navigation from "./pages/nav/Navigation";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Room from "./pages/room/Room";
import Lobby from "./pages/lobby/Lobby";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utill/firebase/firebase.auth";
import { setCurrentUser, setIsLoading } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      dispatch(setIsLoading(true));
      let userAuth = null;
      if (user) {
        const userSnapshot = await createUserDocumentFromAuth(user);
        userAuth = { id: userSnapshot.id, ...userSnapshot.data() };
      }
      localStorage.setItem("user", JSON.stringify(userAuth));
      dispatch(setCurrentUser(userAuth));
      dispatch(setIsLoading(false));
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
