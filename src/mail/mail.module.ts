import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from 'src/jwt/jwt.constants';

@Module({})
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule  {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options 
        },
        MailService
      ],
      exports: [MailService]
    };
  }
}
