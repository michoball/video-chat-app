import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import {
  HomeContainer,
  IconContainer,
  ButtonContainer,
  HomeHeader,
} from "./Home.styles";
import { CamIcon } from "../../UI/CanIcon";

function Home() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <HomeContainer>
      <IconContainer>
        <CamIcon />
      </IconContainer>
      <HomeHeader> Video Chat Room</HomeHeader>
      <ButtonContainer>
        {currentUser ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={() => navigate("/room")}
          >
            <span>GET START</span>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
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
