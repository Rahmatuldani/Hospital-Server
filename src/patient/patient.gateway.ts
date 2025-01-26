import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(5001, {
  cors: {
    origin: "*"
  }
})
export class PatientGateway {
  @WebSocketServer()
  server: Server;

  handleUpdatePatientData() {
    this.server.emit('updatedPatientData', {data: "Patient data has been updated"})
  }
}
