import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/jwt/jwt.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions
    ) {
        console.log(options);
    }
}
