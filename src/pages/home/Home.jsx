import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import {
  HomeContainer,
  IconContainer,
  ButtonContainer,
  HomeHeader,
  BackgroundImage,
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
      <ButtonContainer>
        {currentUser ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate("/lobby")}
          >
            <span>GET START</span>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate("/sign-in")}
          >
            <span>LOG IN</span>
          </Button>
        )}
      </ButtonContainer>
    </HomeContainer>
  );
}

export default Home;
