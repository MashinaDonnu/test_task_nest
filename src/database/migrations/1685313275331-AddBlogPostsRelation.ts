import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostsRelation1685313275331 implements MigrationInterface {
    name = 'AddBlogPostsRelation1685313275331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogPost" ADD "blogId" uuid`);
        await queryRunner.query(`ALTER TABLE "blogPost" ADD CONSTRAINT "FK_be9f22a939ad6839a2626c46452" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogPost" DROP CONSTRAINT "FK_be9f22a939ad6839a2626c46452"`);
        await queryRunner.query(`ALTER TABLE "blogPost" DROP COLUMN "blogId"`);
    }

}
