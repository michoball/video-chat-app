import { VideosContainer } from "./Videos.styles";
import VideoPlayer from "./VideoPlayer";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

function Videos(props) {
  const { users, tracks } = props;
  const { currentUser } = useContext(UserContext);

  return (
    <VideosContainer id="videos">
      <VideoPlayer className="vid" user={users[0]} track={tracks[1]} />
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <VideoPlayer
                className="vid"
                user={user}
                id={user.uid}
                track={user.videoTrack}
                key={user.uid}
              />
            );
          } else return null;
        })}
    </VideosContainer>
  );
}

export default Videos;
