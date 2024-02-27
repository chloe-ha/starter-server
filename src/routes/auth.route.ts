import { Router } from 'express';
import AuthController from '/controllers/auth.controller';
import { Routes } from '/interfaces/routes.interface';
import validationMiddleware from '/middlewares/validation.middleware';
import { CreateUserDTO } from '/models/user.model';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDTO, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDTO, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, this.authController.logOut);
  }
}

export default AuthRoute;
