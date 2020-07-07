export enum OutboundState {
  initiated = "initiated",
  inprogress = "inprogress",
  completed = "completed",
  failed = "failed",
}

export enum SocketEvent {
  INITIAL_DATA = "INITIAL_DATA",
  PUT_SMS_VOTE = "PUT_VOTE",
  GET_VOTES = "GET_VOTES",
  GET_VOTE_COUNT = "GET_VOTE_COUNT",
  MESSAGE = "MESSAGE",
  USER_TOTAL_VOTE = "USER_TOTAL_VOTE",
}
