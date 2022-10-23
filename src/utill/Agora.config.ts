import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

// 아고라 정보
export const config = {
  appId: process.env.REACT_APP_AGORA_RTC_APP_ID_KEY,
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
