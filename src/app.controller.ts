import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto1, AppDto2 } from './app.dto';
import { PatientService } from './patient/patient.service';
import { CreatePatientDto } from './patient/dto/create-patient.dto';
import { faker } from '@faker-js/faker';
import { BloodType, PaymentMethod, Religion, UserGender } from './config/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly patientService: PatientService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('encryption')
  encryption(@Body() body: AppDto2) {
    return this.appService.encryption(body)
  }
  
  @Post('decryption')
  decryption(@Body() body: AppDto1) {
    return this.appService.decryption(body)
  }

  @Get("generatePatients/:sample")
  async generatePatients(@Param('sample') sample: string) {
    for (let index = 0; index < +sample; index++) {
      const patient: CreatePatientDto = {
        nik: faker.string.numeric(16),
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(Object.values(UserGender)),
        birthDate: faker.date.birthdate(),
        birthPlace: faker.location.city(),
        address: faker.location.streetAddress(),
        bloodType: faker.helpers.arrayElement(Object.values(BloodType)),
        paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
        bpjs: faker.string.numeric(20),
        job: faker.person.jobTitle(),
        partner: faker.person.fullName(),
        patientPhone: faker.string.numeric(12),
        partnerPhone: faker.string.numeric(12),
        partnerAddress: faker.location.streetAddress(),
        religion: faker.helpers.arrayElement(Object.values(Religion)),
      }
      await this.patientService.create(patient)
    }

    return 'Generate patients data success'
  }
}
