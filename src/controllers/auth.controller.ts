import { NextFunction, Request, Response } from 'express';
import { ResBody } from '/interfaces/http.interface';
import { CreateUserDTO } from '/models/user.model';
import AuthService from '/services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;
      const email = await this.authService.signup(userData);

      res.status(201).json({ data: { email }, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;
      const { cookie, email } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { email }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      return res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
