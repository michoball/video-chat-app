import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import {
  HomeContainer,
  IconContainer,
  HomeHeader,
  BackgroundImage,
  HomeButton,
} from "./Home.styles";
import Ci from "../../asset/videoChatIcon-96x96.png";

function Home() {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <HomeContainer>
      <IconContainer>
        <BackgroundImage imageUrl={Ci} />
      </IconContainer>
      <HomeHeader> Video Chat Room</HomeHeader>

      {currentUser ? (
        <HomeButton type="submit" onClick={() => navigate("/lobby")}>
          START
        </HomeButton>
      ) : (
        <HomeButton type="submit" onClick={() => navigate("/sign-in")}>
          LOG IN
        </HomeButton>
      )}
    </HomeContainer>
  );
}

export default Home;
