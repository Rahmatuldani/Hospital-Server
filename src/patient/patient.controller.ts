import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientGateway } from './patient.gateway';
import { ValidateMongodbIdPipe } from 'src/pipes/validate-mongodb-id/validate-mongodb-id.pipe';

@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly patientGateway: PatientGateway
  ) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    this.patientGateway.handleUpdatePatientData()
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateMongodbIdPipe) id: string) {
    const patient = await this.patientService.findOne(id);
    if (!patient) {
      throw new NotFoundException("Patient not found")
    }
    return patient;
  }

  @Patch(':id')
  async update(@Param('id', ValidateMongodbIdPipe) id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const existPatient = await this.patientService.findOne(id);
    if (!existPatient) {
      throw new NotFoundException("Patient not found")
    }
    return await this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateMongodbIdPipe) id: string) {
    const existPatient = await this.patientService.findOne(id);
    if (!existPatient) {
      throw new NotFoundException("Patient not found")
    }
    return this.patientService.remove(id);
  }
}
