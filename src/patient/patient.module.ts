import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/patient.entity';
import { PatientGateway } from './patient.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Patient.name, schema: PatientSchema}])
  ],
  controllers: [PatientController],
  providers: [PatientService, PatientGateway],
  exports: [PatientService]
})
export class PatientModule {}
