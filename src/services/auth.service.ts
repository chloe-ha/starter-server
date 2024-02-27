import { hash, compare } from 'bcrypt';
import env from 'config';
import { sign } from 'jsonwebtoken';
import { HttpException } from '/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '/interfaces/auth.interface';
import UserModel, { CreateUserDTO, IUser } from '/models/user.model';
import { isEmpty } from '/utils';

class AuthService {
  public users = UserModel;

  public async signup(userData: CreateUserDTO): Promise<string> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData.email;
  }

  public async login(userData: CreateUserDTO): Promise<{ cookie: string; email: string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser = await this.users.findOne({ email: userData.email }).select('+password').exec();
    if (!findUser) throw new HttpException(409, 'Incorrect email / password');

    const isPasswordMatching = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Incorrect email / password');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, email: findUser.email };
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = env.SECRET_KEY;
    const expiresIn = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
