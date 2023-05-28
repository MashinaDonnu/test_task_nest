import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPosts1685311872292 implements MigrationInterface {
    name = 'AddBlogPosts1685311872292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blogPost" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "image" text, CONSTRAINT "PK_54354861dc8aec388f2e90215f6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blogPost"`);
    }

}
