import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { QuestionsModule } from "./questions/questions.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const port = configService.get<string>("POSTGRES_PORT");

        if (!port) {
          throw new Error("POSTGRES_PORT is not defined");
        }

        return {
          type: "postgres",
          host: configService.get<string>("POSTGRES_HOST"),
          port: +port,
          username: configService.get<string>("POSTGRES_USER"),
          password: configService.get<string>("POSTGRES_PASSWORD"),
          database: configService.get<string>("POSTGRES_DB"),
          entities: ["dist/**/*.entity.{ts,js}"],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
