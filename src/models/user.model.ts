import { IsEmail, IsString } from 'class-validator';
import { model, Schema, Document } from 'mongoose';

export class CreateUserDTO {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
}

const schema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

class UserClass {}
schema.loadClass(UserClass);

const UserModel = model<IUser>('User', schema);

export default UserModel;
