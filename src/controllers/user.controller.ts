import { NextFunction, Request, Response } from 'express';
import { ResBody } from '/interfaces/http.interface';
import { CreateUserDTO } from '/models/user.model';
import userService from '/services/user.service';

class UserController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const findAllUsersData = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;
      const email = await this.userService.createUser(userData);

      res.status(201).json({ data: { email }, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response<ResBody>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
