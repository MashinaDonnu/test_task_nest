import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1685291533366 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1685291533366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "rt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rt"`);
    }

}
