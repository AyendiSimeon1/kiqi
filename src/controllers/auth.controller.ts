import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthServiceImpl } from "../services/impl/auth.service.impl";

export class AuthController {
  private authService: AuthServiceImpl;

  constructor() {
    this.authService = new AuthServiceImpl();
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const { accessToken, refreshToken } = await this.authService.login({ email });
      res.status(StatusCodes.CREATED).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { sender, type, email } = req.body;
      const user = await this.authService.createSenderEmail({ sender, type, email });
      res.status(StatusCodes.CREATED).json({
        error: false,
        message: `User registered successfully. Email: ${user.senderEmail}`,
      });
    } catch (error) {
      next(error);
    }
  };
}
