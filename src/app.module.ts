import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { SocketsGateway } from './sockets/sockets.gateway'; // Import your Socket.IO gateway
import { Message } from './messages/messages.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root@123',
      database: 'todos',
      entities: [Message],
      synchronize: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MessagesModule,
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual JWT secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [SocketsGateway],
})
export class AppModule {}
