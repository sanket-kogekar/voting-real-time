import { createContext } from "react";
import socketio from "socket.io-client";
// const SOCKET_URL = "http://localhost:5000";
// const SOCKET_URL = "https://easy-voting.herokuapp.com/"
//process.env.SOCKET_URL

const SOCKET_URL = "https://easy-voting.herokuapp.com";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
