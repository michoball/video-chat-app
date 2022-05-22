import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import {
  HomeContainer,
  IconContainer,
  CamIcon,
  ButtonContainer,
  HomeHeader,
} from "./Home.styles";

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

// const [inCall, setInCall] = useState(false);
// const [channelName, setChannelName] = useState("");
// {inCall ? (
//   <VideoCall setInCall={setInCall} channelName={channelName} />
// ) : (
//   <RoomForm setInCall={setInCall} setChannelName={setChannelName} />
// )}
