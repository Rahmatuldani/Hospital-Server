import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({
    versionKey: false,
    timestamps: true
})
export class User {
    @Prop({required: true})
    np: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;
    
    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    birthDate: Date;

    @Prop({required: true})
    birthPlace: string;

    @Prop({required: true})
    gender: string;

    @Prop({required: true})
    role: string;

    @Prop({default: null})
    deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret
    }
})