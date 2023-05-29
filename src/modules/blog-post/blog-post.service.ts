import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from '@app/modules/blog-post/db/blog-post.repository';
import { BlogPostEntity } from '@app/modules/blog-post/db/blog-post.entity';
import { CreateBlogPostInput } from '@app/modules/blog-post/inputs/create-blog-post.input';
import { UpdateBlogPostInput } from '@app/modules/blog-post/inputs/update-blog-post.input';
import { GetPostsListInput } from '@app/modules/blog-post/inputs/get-posts-list.input';

@Injectable()
export class BlogPostService {
  constructor(private readonly _repository: BlogPostRepository) {}

  async create(dto: CreateBlogPostInput): Promise<BlogPostEntity> {
    const entity = new BlogPostEntity();
    Object.assign(entity, dto);
    return await this._repository.createOneEntity(entity);
  }

  async update(dto: UpdateBlogPostInput): Promise<BlogPostEntity> {
    const entity = new BlogPostEntity();
    Object.assign(entity, dto);
    return await this._repository.updateOneEntityById(dto.id, entity);
  }

  async delete(id: string): Promise<void> {
    await this._repository.deleteOneEntity({ id });
  }

  async getById(id: string): Promise<BlogPostEntity> {
    return this._repository.findOneEntity({ where: { id } });
  }

  async getByBlogId(blogId: string): Promise<BlogPostEntity[]> {
    return await this._repository.findManyEntities({ where: { blog: { id: blogId } } });
  }

  async getAll(): Promise<BlogPostEntity[]> {
    return await this._repository.findManyEntities();
  }

  async getAllPaginate(dto: GetPostsListInput): Promise<BlogPostEntity[]> {
    return await this._repository.getSortPaginate(dto, dto.order);
  }
}
