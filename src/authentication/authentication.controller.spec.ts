import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { MagicLinkStrategy } from "./strategies/link";
import { IUserService } from "src/user/user.interface";
import { UserMockService } from "src/user/__mocks__/usermock.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/interface";
import { ConsoleMailerService } from "src/mailer/console/mailer.service";
import {
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import type { Request } from "express";

describe("AuthenticationController", () => {
  let controller: AuthenticationController;
  let magicLink: MagicLinkStrategy;
  let userService: IUserService;

  const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "hashedpassword",
    is_active: true,
  };

  const mockInactiveUser = {
    ...mockUser,
    is_active: false,
  };

  const mockRequest = () => {
    const req: Partial<Request> = {};
    // @ts-expect-error
    req.session = {
      save: jest.fn().mockImplementation((cb) => {
        if (cb) cb();
      }),
      user: null,
    };
    return req;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        MagicLinkStrategy,
        {
          provide: IUserService,
          useClass: UserMockService,
        },
        {
          provide: MailerService,
          useClass: ConsoleMailerService,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    magicLink = module.get<MagicLinkStrategy>(MagicLinkStrategy);
    userService = module.get<IUserService>(IUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should successfully login with valid credentials", async () => {
      const req = mockRequest();
      console.log(req);
      // @ts-expect-error
      jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);

      const result = await controller.login(
        {
          email: "test@example.com",
          //@ts-expect-error
          password: null,
        },
        req
      );

      expect(result.user).toEqual(mockUser);
      expect(req.session?.user).toEqual(mockUser);
      expect(req.session?.save).toHaveBeenCalled();
    });

    it("should throw UnauthorizedException for inactive user", async () => {
      const req = mockRequest();
      jest
        .spyOn(userService, "getUserByEmail")
        // @ts-expect-error
        .mockResolvedValue(mockInactiveUser);

      await expect(
        controller.login(
          {
            email: "inactive@example.com",
            // @ts-expect-error
            password: "password",
          },
          req
        )
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException for non-existent user", async () => {
      const req = mockRequest();
      jest.spyOn(userService, "getUserByEmail").mockResolvedValue(null);

      await expect(
        controller.login(
          {
            email: "nonexistent@example.com",
            // @ts-expect-error
            password: "password",
          },
          req
        )
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("loginWithEmail", () => {
    it("should successfully send magic link", async () => {
      const spy = jest
        .spyOn(magicLink, "sendMagicLink")
        .mockResolvedValue(undefined);

      const result = await controller.loginWithEmail({
        email: "test@example.com",
      });

      expect(spy).toHaveBeenCalled();
      expect(result.success).toBeTruthy();
    });

    it("should throw InternalServerErrorException when email fails", async () => {
      const spy = jest
        .spyOn(magicLink, "sendMagicLink")
        .mockReturnValue(Promise.reject(new Error("UserNotExists")));

      await expect(
        controller.loginWithEmail({
          email: "test@example.com",
        })
      ).rejects.toThrow(InternalServerErrorException);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockClear();
    });
  });

  describe("magicLink", () => {
    it("should successfully authenticate with valid magic link", async () => {
      const req = mockRequest();
      // @ts-expect-error
      req.user = { email: mockUser.email };
      // @ts-expect-error
      jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);

      // @ts-expect-error
      const result = await controller.magicLink(req);

      expect(result.user).toEqual(mockUser);
      expect(req.session?.user).toEqual(mockUser);
      expect(req.session?.save).toHaveBeenCalled();
    });

    it("should throw UnauthorizedException for invalid token", async () => {
      const req = mockRequest();
      // @ts-expect-error
      req.user = { email: "nonexistent@example.com" };
      jest.spyOn(userService, "getUserByEmail").mockResolvedValue(null);

      // @ts-expect-error
      await expect(controller.magicLink(req)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should throw UnauthorizedException for inactive user", async () => {
      const req = mockRequest();
      // @ts-expect-error
      req.user = { email: mockInactiveUser.email };
      jest
        .spyOn(userService, "getUserByEmail")
        // @ts-expect-error
        .mockResolvedValue(mockInactiveUser);

      // @ts-expect-error
      await expect(controller.magicLink(req)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
