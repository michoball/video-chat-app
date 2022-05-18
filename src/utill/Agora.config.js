import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export const config = {
  appId: "0dd243375ee7421785d55f9c59ce43a3",
  token: null,
};
export const useClient = createClient({ mode: "rtc", codec: "vp8" });
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
