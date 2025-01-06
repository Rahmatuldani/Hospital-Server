import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class LibService {
    private secretKey: string;

    constructor(
        private configService: ConfigService
    ) {
        this.secretKey = configService.get<string>("secretKey")
    }
    generateNp(birthDate: Date): string {
        let date = new Date()
        const joinDate = {
            year: date.getFullYear(),
            month: (date.getMonth()+1).toString().padStart(2, '0'),
        }
        date = new Date(birthDate)
        const userDate = {
            year: date.getFullYear(),
            month: (date.getMonth()+1).toString().padStart(2, "0"),
            date: (date.getDate()).toString().padStart(2, "0")
        }
        const random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        return `${userDate.year}${userDate.month}${userDate.date}${joinDate.year}${joinDate.month}${random}`
    }

    encryption(data: string): string {
        const hmac = createHmac('sha256', this.secretKey);
        hmac.update(data)
        return hmac.digest('hex')
    }

    verifyencryption(data: string, signature: string): boolean {
        const expectedSignature = this.encryption(data)
        return expectedSignature === signature
    }
}
