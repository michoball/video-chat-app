import {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

export const config = {
  appId: "0dd243375ee7421785d55f9c59ce43a3",
  token: null,
};
export const useClient = createClient({ mode: "rtc", codec: "vp8" });

export const MicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
  {},
  {
    // 카메라 설정 - 잘 보이게 만들었지만 설정 안한다고 안보이는 건 아님
    encoderConfig: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
  }
);
export const setScreenTracks = createScreenVideoTrack(
  {
    encoderConfig: {
      framerate: 15,
      height: 720,
      width: 1280,
    },
  },
  "auto"
);
