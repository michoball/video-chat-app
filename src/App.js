import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { GlobalStyles } from "./global.styles";
import { AppThemeProvider } from "./UI/Theme.config";
import Spinner from "./UI/spinner/spinner";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import("./pages/home/Home"));
const Authentication = lazy(() =>
  import("./pages/authentication/Authentication")
);
const Navigation = lazy(() => import("./pages/nav/Navigation"));
const PrivateRoute = lazy(() =>
  import("./components/privateRoute/PrivateRoute")
);
const Room = lazy(() => import("./pages/room/Room"));
const Lobby = lazy(() => import("./pages/lobby/Lobby"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <Suspense fallback={<Spinner />}>
      <AppThemeProvider>
        <GlobalStyles />
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
      </AppThemeProvider>
    </Suspense>
  );
}

export default App;
