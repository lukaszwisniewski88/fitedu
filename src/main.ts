import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";
import pgStore from "connect-pg-simple";

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
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

declare module "express-session" {
  export interface SessionData {
    visits: number;
  }
}
