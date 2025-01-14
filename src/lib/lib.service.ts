import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from 'crypto';

@Injectable()
export class LibService {
    private secretKey: string;
    private key: Buffer;

    constructor(
        private configService: ConfigService
    ) {
        this.secretKey = configService.get<string>("secretKey")
        this.key = createHash('sha256').update(this.secretKey).digest()
        
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

    hash(data: string): string {
        const hmac = createHmac('sha256', this.secretKey);
        hmac.update(data)
        return hmac.digest('hex')
    }

    encryption(data: string) {
        const iv = randomBytes(16);
        const cipher = createCipheriv('aes-256-cbc', this.key, iv)
        const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()])
        
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`
    }

    decryption(data: string) {
        const [ivHex, encryptedHex] = data.split(":")
        const iv = Buffer.from(ivHex, 'hex');
        if (iv.length !== 16) {
            throw new BadRequestException("invalid data")
        }
        const encryptedText = Buffer.from(encryptedHex, 'hex');

        const decipher = createDecipheriv('aes-256-cbc', this.key, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

        return decrypted.toString('utf8')
    }

    verifyhash(data: string, signature: string): boolean {
        const expectedSignature = this.hash(data)
        return expectedSignature === signature
    }
}
