import { DynamicModule, Module } from "@nestjs/common";
import { ConsoleMailerService } from "./console/mailer.service";
import { MailerService } from "./interface";
import { NodeMailerService } from "./nodemailer/nodemailer.service";

@Module({})
export class MailerModule {
  static register(): DynamicModule {
    let mailerType = process.env.MAILER;
    if (!mailerType) {
      mailerType = "console";
    }
    if (mailerType.toLowerCase() === "nodemailer") {
      return {
        module: MailerModule,
        providers: [
          {
            provide: MailerService,
            useClass: NodeMailerService,
          },
        ],
        exports: [MailerService],
      };
    }
    return {
      module: MailerModule,
      providers: [
        {
          provide: MailerService,
          useClass: ConsoleMailerService,
        },
      ],
      exports: [MailerService],
    };
  }
}
