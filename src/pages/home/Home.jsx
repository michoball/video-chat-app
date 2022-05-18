import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import {
  HomeContainer,
  IconContainer,
  CamIcon,
  ButtonContainer,
  HomeHeader,
} from "./Home.styles";

function Home() {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <IconContainer>
        <CamIcon />
      </IconContainer>
      <HomeHeader> Video Chat Place</HomeHeader>
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

// const [inCall, setInCall] = useState(false);
// const [channelName, setChannelName] = useState("");
// {inCall ? (
//   <VideoCall setInCall={setInCall} channelName={channelName} />
// ) : (
//   <RoomForm setInCall={setInCall} setChannelName={setChannelName} />
// )}
