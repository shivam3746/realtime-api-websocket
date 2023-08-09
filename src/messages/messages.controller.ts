import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard) 
  @Post('send-message')
  async sendMessage(@Body() body: { sender:string, message: string }) {
    const { sender, message } = body;
    
    // Trigger the WebSocket event here using your SocketsGateway instance
    // For example, emit the 'sendMessage' event with the received message
    this.messagesService.emitMessage(sender, message);
    
    return { success: true, message: 'Message sent via WebSocket!' };
  }

// Use JwtAuthGuard to protect the endpoint
  @UseGuards(JwtAuthGuard)
  @Get('get-messages')
  async getMessages() {
    const messages = this.messagesService.getMessages(); //getMessages is already defined in messages.service
    return { success: true, messages };
  }

}
