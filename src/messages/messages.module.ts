import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';
import { SocketsGateway } from 'src/sockets/sockets.gateway';
import { JwtService } from 'src/auth/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService, SocketsGateway],
})
export class MessagesModule {}
