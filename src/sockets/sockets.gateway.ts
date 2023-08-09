// sockets/sockets.gateway.ts

import { OnGatewayConnection, WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayConnection {
  constructor() {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;

    if (!token) {
      client.disconnect(); // Disconnect unauthorized clients
      return;
    }

    try {
      const decodedToken = jwt.verify(token, 'your_secret_key'); // Verify token manually
      client['user'] = decodedToken;
    } catch (error) {
      client.disconnect(); // Disconnect clients with invalid tokens
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, data: { message: string }) {
    // Here you can access client['user'] to get the authenticated user info
    const sender = client['user'];
    
    // Broadcast the message to other connected clients
    client.broadcast.emit('newMessage', { sender, message: data.message });
  }
}
