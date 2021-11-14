import {RequestListener} from "http";
import {SocketService} from "./socketServer";
const http = require('http');
const port = 3000;
const requestHandler: RequestListener = (request, response) => {
    response.end('Hello  Node.js Server!');
};

const server = http.createServer(requestHandler);
const socketService = new SocketService(server)
server.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
