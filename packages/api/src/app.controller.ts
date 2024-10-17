import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  me(): string {
    return "Hello there";
  }
}
