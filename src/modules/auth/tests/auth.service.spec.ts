// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from '@app/services/response.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { LoginUserInput } from '@app/modules/auth/inputs/login-user.input';
import { AuthResponse } from '@app/modules/auth/response/auth.response';
import { HttpException } from '@nestjs/common';
import { CreateUserInput } from '@app/modules/auth/inputs/create-user.input';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserRepository } from '@app/modules/user/db/user.repository';
import { compare, hash } from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserRepository, ResponseService, JwtService, ConfigService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserInput: CreateUserInput = {
        email: 'test@gmail.com',
        password: 'password12322',
        firstName: 'test',
        lastName: 'testovich',
      };

      const createdUser: UserEntity = new UserEntity();
      Object.assign(createdUser, createUserInput);

      const result: UserEntity = await authService.register(createUserInput);

      expect(result).toEqual(createdUser);
      expect(userRepository.findOneEntity).toHaveBeenCalledWith({ where: { email: createUserInput.email } });
      expect(userRepository.createOneEntity).toHaveBeenCalledWith(createdUser);
    });

    it('should not register user if email is already taken', async () => {
      const createUserInput: CreateUserInput = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const existingUser: UserEntity = new UserEntity();
      Object.assign(existingUser, createUserInput);

      await expect(authService.register(createUserInput)).rejects.toThrow(HttpException);
      expect(userRepository.findOneEntity).toHaveBeenCalledWith({ where: { email: createUserInput.email } });
      expect(userRepository.createOneEntity).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login and return the auth response', async () => {
      const loginUserInput: LoginUserInput = {
        email: 'test@example.com',
        password: 'password123',
      };

      const existingUser: UserEntity = new UserEntity();
      Object.assign(existingUser, {
        id: '35141647-e613-4f34-bc76-e735be8c9d70',
        email: loginUserInput.email,
        password: await hash(loginUserInput.password, 3),
      });

      const authResponse: AuthResponse = {
        user: existingUser,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      };

      jest.spyOn(userRepository, 'findOneEntity').mockResolvedValue(existingUser);
      jest.spyOn(authService, 'generateTokens').mockResolvedValue(authResponse.tokens);
      jest.spyOn(authService, 'updateRtHash').mockResolvedValue(existingUser);

      const result: AuthResponse = await authService.login(loginUserInput);

      expect(result).toEqual(authResponse);
      expect(userRepository.findOneEntity).toHaveBeenCalledWith({ where: { email: loginUserInput.email } });
      expect(authService.generateTokens).toHaveBeenCalledWith(existingUser);
      expect(authService.updateRtHash).toHaveBeenCalledWith(existingUser.id, authResponse.tokens.refreshToken);
    });

    it('shoulf throw exception if email not found', async () => {
      const loginUserInput: LoginUserInput = {
        email: 'test@gmail.com',
        password: 'password123333',
      };

      jest.spyOn(userRepository, 'findOneEntity').mockResolvedValue(null);

      await expect(authService.login(loginUserInput)).rejects.toThrow(HttpException);
      expect(userRepository.findOneEntity).toHaveBeenCalledWith({ where: { email: loginUserInput.email } });
      expect(authService.generateTokens).not.toHaveBeenCalled();
      expect(authService.updateRtHash).not.toHaveBeenCalled();
    });

    it('should throw exception if pass not valid', async () => {
      const loginUserInput: LoginUserInput = {
        email: 'test@gmail.com',
        password: 'invalid_password123',
      };

      const existingUser: UserEntity = new UserEntity();
      Object.assign(existingUser, {
        id: '123',
        email: loginUserInput.email,
        password: await hash('password111', 3),
      });

      jest.spyOn(userRepository, 'findOneEntity').mockResolvedValue(existingUser);
      jest.spyOn(authService, 'generateTokens');
      jest.spyOn(authService, 'updateRtHash');

      await expect(authService.login(loginUserInput)).rejects.toThrow(HttpException);
      expect(userRepository.findOneEntity).toHaveBeenCalledWith({ where: { email: loginUserInput.email } });
      expect(authService.generateTokens).not.toHaveBeenCalled();
      expect(authService.updateRtHash).not.toHaveBeenCalled();
    });
  });
});
