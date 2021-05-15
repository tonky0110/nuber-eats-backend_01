import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

// 1. class타입으로 선언.
// export class JwtMiddleware implements NestMiddleware {
//     use(req:Request, res: Response, next: NextFunction) {
//         console.log(req.headers);
//         next();
//     } 
// }

// 2. function타입으로 선언.
export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    next();
}