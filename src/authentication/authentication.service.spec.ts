import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should return a correct hash", async () => {
    const password = "testSuperSecurePassword";
    const hash = await service.hashPassword(password);
    console.log(hash);
    expect(hash).toBeDefined();
    const isValid = await service.verifyPassword({
      password,
      hash,
    });
    expect(isValid).toBe(true);
  });
});
