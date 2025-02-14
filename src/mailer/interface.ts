export type EmailTemplateFn<TData extends Record<string, unknown>> = (
  data: TData,
) => {
  html: string;
  text: string;
};

export type MailOptions<TData extends Record<string, unknown>> = {
  to_email: string;
  from_email: string;
  subject: string;
  data: TData;
  templateFn: EmailTemplateFn<TData>;
  cc_email?: string;
  bcc_email?: string;
};

export interface MailerService {
  sendMail: <TData extends Record<string, unknown>>(
    options: MailOptions<TData>,
  ) => Promise<void>;
}

export const MailerService = Symbol("MailerService");
