import {
    Request,
    Response,
    NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

import User from '../models/User';

export interface AuthRequest
    extends Request {
    user?: any;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { id: string };

        const user = await User.findById(
            decoded.id
        ).select('-password');

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
};