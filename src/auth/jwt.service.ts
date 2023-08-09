import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  sign(payload: any): string {
    return this.nestJwtService.sign(payload);
  }

  verify(token: string): any {
    return this.nestJwtService.verify(token);
  }
}
