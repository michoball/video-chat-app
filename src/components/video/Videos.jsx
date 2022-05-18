import { AgoraVideoPlayer } from "agora-rtc-react";

function Videos(props) {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos" style={{ width: "400px", height: "400px" }}>
        <AgoraVideoPlayer
          className="vid"
          videoTrack={tracks[1]}
          style={{ height: "95%", width: "95%", border: "1px solid black" }}
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  style={{ height: "95%", width: "95%" }}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
}

export default Videos;
