import { Injectable, Logger } from "@nestjs/common";
import { MailerService, MailOptions } from "../interface";
import { ConfigService } from "src/config/config.service";
import { type Transporter, createTransport } from "nodemailer";

@Injectable()
export class NodeMailerService implements MailerService {
  logger = new Logger("NodeMailer");
  private transporter: Transporter;

  constructor(config: ConfigService) {
    this.transporter = createTransport({
      host: config.get("MAILER_HOST"),
      port: Number.parseInt(config.get("MAILER_PORT")),
      secure: config.get("MAILER_SECURE") === "true",
      auth: {
        user: config.get("MAILER_USER"),
        pass: config.get("MAILER_PASS"),
      },
    });
  }
  sendMail: <TData extends Record<string, unknown>>(
    options: MailOptions<TData>,
  ) => Promise<void> = async (options) => {
    try {
      await this.transporter.sendMail({
        from: options.from_email,
        to: options.to_email,
        subject: options.subject,
        text: options.templateFn(options.data).text,
        html: options.templateFn(options.data).html,
        cc: options.cc_email,
        bcc: options.bcc_email,
      });
    } catch (e) {
      this.logger.error(`Error sending email to ${options.to_email}`);
      this.logger.error(e.message);
    }
  };
}
