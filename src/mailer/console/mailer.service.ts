import { Injectable, Logger } from "@nestjs/common";
import { MailerService, MailOptions } from "../interface";

@Injectable()
export class ConsoleMailerService implements MailerService {
  logger = new Logger("ConsoleMail");
  sendMail: <TData extends Record<string, unknown>>(
    options: MailOptions<TData>,
  ) => Promise<void> = (options) => {
    this.logger.log(`Sending email to ${options.to_email}`);
    this.logger.log(`Subject: ${options.subject}`);
    this.logger.log(`Data: ${options.templateFn(options.data).text}`);
    return Promise.resolve();
  };
}
