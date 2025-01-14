import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BloodType, PaymentMethod, Religion, UserGender } from "src/config/types";

export type PatientDocument = HydratedDocument<Patient>

@Schema({
    versionKey: false,
    timestamps: true
})

export class Patient {
    @Prop({required: true})
    name: string;

    @Prop({
        required: true,
        enum: UserGender
    })
    gender: UserGender;

    @Prop({required: true})
    birthDate: Date;

    @Prop({required: true})
    birthPlace: string;

    @Prop({required: true})
    address: string;

    @Prop({
        enum: BloodType,
        default: null
    })
    bloodType: BloodType | null;

    @Prop({
        required: true,
        enum: PaymentMethod
    })
    paymentMethod: PaymentMethod
    
    @Prop({
        default: null
    })
    job: string | null;

    @Prop({
        required: true
    })
    partner: string;

    @Prop({
        required: true
    })
    patientPhone: string;

    @Prop({
        required: true
    })
    partnerPhone: string;

    @Prop({
        required: true
    })
    partnerAddress: string;

    @Prop({
        required: true,
        enum: Religion
    })
    religion: Religion;

    @Prop({
        default: null
    })
    deletedAt: Date | null;
}

export const PatientSchema = SchemaFactory.createForClass(Patient)