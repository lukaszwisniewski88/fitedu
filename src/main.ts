import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";
import pgStore from "connect-pg-simple";
import { User } from "./user/user.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new (pgStore(session))({
        conString: process.env.DATABASE_URL,
      }),
      secret: process.env.SESSION_SECRET || "",
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

declare module "express-session" {
  export interface SessionData {
    user: User | null;
    logged_in_time: Date | null;
    last_activity: Date | null;
  }
}

declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace Express {
    interface User {
      id: string;
      email: string;
      is_active: boolean;
      role: string;
    }
  }
}
