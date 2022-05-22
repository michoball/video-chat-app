import { Video, UserNameTag, VideoContainer } from "./VideoPlayer.styles";

function VideoPlayer({ user, track }) {
  console.log(user);
  return (
    <VideoContainer>
      <UserNameTag>
        <p>{user.name ? `${user.name}` : `${user.uid}`}</p>
      </UserNameTag>
      <Video className="vid" videoTrack={track} />
    </VideoContainer>
  );
}

export default VideoPlayer;
