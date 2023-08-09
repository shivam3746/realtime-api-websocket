import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { SocketsGateway } from 'src/sockets/sockets.gateway';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual JWT secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
  providers: [SocketsGateway, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
