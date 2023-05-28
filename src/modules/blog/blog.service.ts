import { Injectable } from '@nestjs/common';
import { BlogRepository } from '@app/modules/blog/db/blog.repository';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { CreateBlogInput } from '@app/modules/blog/inputs/create-blog.input';
import { UpdateBlogInput } from '@app/modules/blog/inputs/update-blog.input';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';

@Injectable()
export class BlogService {
  constructor(private readonly _repository: BlogRepository) {}

  async create(dto: CreateBlogInput, currentUser: UserEntity): Promise<BlogEntity> {
    return await this._repository.createOneEntity({ user: currentUser, ...dto });
  }

  async update(dto: UpdateBlogInput): Promise<BlogEntity> {
    return await this._repository.updateOneEntityById(dto.id, dto);
  }

  async delete(id: string): Promise<void> {
    console.log('id: ', id);
    await this._repository.deleteOneEntity({ id });
  }

  async getById(id: string): Promise<BlogEntity> {
    return this._repository.findOneEntity({ where: { id } });
  }

  async getByUserId(userId: string): Promise<BlogEntity[]> {
    return await this._repository.findManyEntities({ where: { user: { id: userId } } });
  }

  async getAll(): Promise<BlogEntity[]> {
    return await this._repository.findManyEntities();
  }
}
