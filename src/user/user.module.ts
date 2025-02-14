import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUserRepository, IUserService } from "./user.interface";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { MailerModule } from "src/mailer/mailer.module";

@Module({
  imports: [MailerModule.register()],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  exports: [IUserService],
  controllers: [UserController],
})
export class UserModule {}
