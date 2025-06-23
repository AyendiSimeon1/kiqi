import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { authService } from '../services/User';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/AsyncHandler';


export interface AuthRequest extends Request {
    user?: User;
}

export const verifyJWT = asyncHandler(async (req: any  , res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        
        const user = await authService.findUserById(decodedToken?.id);

        if (!user) {
            throw new ApiError(401, 'Invalid Access Token');
        }

        req.user = user;
        next();
    } catch (error: unknown) {
        throw new ApiError(401, error instanceof Error ? error.message : 'Invalid access token');
    }
});