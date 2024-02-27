import { Router } from 'express';
import UserController from '/controllers/user.controller';
import { Routes } from '/interfaces/routes.interface';
import authMiddleware from '/middlewares/auth.middleware';
import validationMiddleware from '/middlewares/validation.middleware';
import { CreateUserDTO } from '/models/user.model';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.userController.getUserById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUserDTO, 'body'), this.userController.createUser);
    // this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateUserDTO, 'body', true), this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.userController.deleteUser);
  }
}

export default UsersRoute;
