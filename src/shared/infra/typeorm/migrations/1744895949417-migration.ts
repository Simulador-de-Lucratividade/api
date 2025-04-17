import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744895949417 implements MigrationInterface {
  name = "Migration1744895949417";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE budgets
          ALTER COLUMN status TYPE VARCHAR(20);
        `);

    await queryRunner.query(`
          UPDATE budgets SET status = 'draft' WHERE status IS NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE budgets
          ALTER COLUMN status TYPE VARCHAR;
        `);
  }
}
