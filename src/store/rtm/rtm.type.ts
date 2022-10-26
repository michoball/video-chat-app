export enum RTM_ACTION_TYPE {
  SET_RTM_CLIENT = "SET_RTM_CLIENT",
  ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE",
  SET_RTM_USER = "SET_RTM_USER",
  CLEAR_RTM = "CLEAR_RTM",
  SET_CHANNEL = "SET_CHANNEL",
}

export type Messages = {
  id: string;
  message: string;
  from: string;
  type: string;
  displayName: string;
};
