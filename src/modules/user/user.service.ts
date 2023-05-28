import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/modules/user/db/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _repository: UserRepository) {}
}
