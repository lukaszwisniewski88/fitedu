import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CONFIG_OPTIONS } from "./config.options";

type RegisterOptions = {
  folder: string;
};

@Global()
@Module({})
export class ConfigModule {
  static register(options: RegisterOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
