import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  handleMessage(message: string): void {
    console.log('Mensaje recibido de Kafka:', message);
  }
}
