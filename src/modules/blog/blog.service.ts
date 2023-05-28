import { Injectable } from '@nestjs/common';
import { BlogRepository } from '@app/modules/blog/db/blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly _repository: BlogRepository) {}

  async create() {}

  async update() {}

  async delete() {}

  async getById() {}

  getByUserId() {}

  getAll() {}
}
