import WebSocket from "ws";

const sockets: Set<WebSocket> = new Set();

export function addConnection(ws: WebSocket): void {
  console.log("Connected");
  sockets.add(ws);
}

export function broadcast(message: any): void {
  for (const socket of sockets) {
    socket.send(message, (err: Error) => {
      if (err) {
        console.error(err);
        sockets.delete(socket);
      }
    });
  }
}
