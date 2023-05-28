import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/modules/user/db/user.repository';
import { CreateUserInput } from '@app/modules/auth/inputs/create-user.input';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { LoginUserInput } from '@app/modules/auth/inputs/login-user.input';
import { ResponseService } from '@app/services/response.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@app/common/types/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from '@app/modules/auth/response/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly _repository: UserRepository,
    private readonly responseService: ResponseService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: CreateUserInput): Promise<UserEntity> {
    const user = await this._repository.findOneEntity({
      where: { email: dto.email },
    });

    if (!user) {
      const newUser = new UserEntity();
      Object.assign(newUser, dto);
      return await this._repository.createOneEntity(newUser);
    }
  }

  async login(dto: LoginUserInput): Promise<AuthResponse> {
    const user = await this._repository.findOneEntity({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        this.responseService.exceptionResponse({
          message: `User with email ${dto.email} not found`,
          statusCode: HttpStatus.FORBIDDEN,
        }),
        HttpStatus.FORBIDDEN,
      );
    }

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        this.responseService.exceptionResponse({
          message: 'Password not valid',
          statusCode: HttpStatus.FORBIDDEN,
        }),
        HttpStatus.FORBIDDEN,
      );
    }

    const tokens = await this.generateTokens(user);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  private async generateTokens(user: UserEntity) {
    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRtHash(userId: string, rt: string): Promise<UserEntity> {
    const user = await this._repository.findOneEntity({
      where: { id: userId },
    });

    if (user) {
      user.rt = await hash(rt, 3);
      await this._repository.save(user);
      return user;
    }

    throw new HttpException(
      this.responseService.exceptionResponse({
        message: `User not found updateRtHash`,
        statusCode: HttpStatus.FORBIDDEN,
      }),
      HttpStatus.FORBIDDEN,
    );
  }
}
