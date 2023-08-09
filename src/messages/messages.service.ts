import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocketsGateway } from '../sockets/sockets.gateway';
import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    private readonly socketsGateway: SocketsGateway,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async emitMessage(sender: string, messageContent: string) {
    const message = new Message();
    message.sender = sender; 
    message.content = messageContent;

    await this.messageRepository.save(message);

    this.socketsGateway.server.emit('sendMessage', { message: messageContent });
  }

  async getMessages(): Promise<Message[]> {
    console.log('Fetching messages...');
    const messages = await this.messageRepository.find();
    console.log('Fetched messages:', messages);
    return messages;
    // return this.messageRepository.find();
  }
}
