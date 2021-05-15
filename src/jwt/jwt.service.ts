import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';


@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
        // private readonly configService: ConfigService
    ) {}

    sign(userId: number): string {
        // return jwt.sign(payload, this.configService.get('PRIVATE_KEY')); // 이렇게도 가능
        return jwt.sign({ id: userId }, this.options.privateKey);
    }
}
