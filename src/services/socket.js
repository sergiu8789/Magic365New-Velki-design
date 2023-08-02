import { io } from 'socket.io-client';
const URL = process.env.REACT_APP_API_ENDPOINT_URL;
//console.log(URL,URL.replace('/api/',''),"Sock");
export const socket = io(URL.replace('/api/',''));
