import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

// 1. class타입으로 선언.
@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async use(req:Request, res: Response, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            const decoded = this.jwtService.verity(token.toString());
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                try {
                    const user = await this.usersService.findById(decoded['id']);
                    req['user'] = user;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        next();
    } 
}

// 2. function타입으로 선언.
// export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
//     console.log(req.headers);
//     next();
// }