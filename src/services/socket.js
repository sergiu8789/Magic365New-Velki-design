import { io } from "socket.io-client";
const URL = process.env.REACT_APP_API_ENDPOINT_URL;
export const socket = io("https://socket.magic365.live/");
