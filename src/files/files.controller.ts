import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UnsupportedMediaTypeException,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('files')
export class FilesController {
    @Post('uploadPhoto')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./storage/photo",
            filename: (req, file, callback) => {
                const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const extension = extname(file.originalname);
                callback(null, `${fileName}${extension}`)
            }
        }),
        limits: {fileSize: 2 * 1024 * 1024},
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/image\/(jpg|jpeg|png)/)) {
                return callback(new Error('Only image files are allowed!'), false)
            }
            callback(null, true)
        }
    }))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: 'Upload photo',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File is required")
        }
        return {
            message: "File upload success",
            file: file
        }
    }

    @Get("getPhoto/:fileName")
    getPhoto(@Res() res: Response, @Param("fileName") fileName: string) {
        const file = createReadStream(join(process.cwd(), `/storage/photo/${fileName}`))
        file.pipe(res)
    }

    @Post('uploadDocument')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./storage/document",
            filename: (req, file, callback) => {
                callback(null, file.originalname)
            }
        }),
        limits: {fileSize: 5 * 1024 * 1024},
        fileFilter: (req, file, callback) => {
            const allowedTypes = [
                'application/pdf',
                'application/msword', // .doc
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
                'application/vnd.ms-excel', // .xls
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            ];
            if (!allowedTypes.includes(file.mimetype)) {
                return callback(new UnsupportedMediaTypeException('Invalid file type. Only .doc, .xls, .pdf'), false)
            }
            callback(null, true)
        }
    }))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: 'Upload photo',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadDocument(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File is required")
        }
        return {
            message: "File upload success",
            file: file
        }
    }

    @Get("getDocument/:fileName")
    getDocument(@Res() res: Response, @Param("fileName") fileName: string) {
        const file = createReadStream(join(process.cwd(), `/storage/document/${fileName}`))
        file.pipe(res)
    }
}
