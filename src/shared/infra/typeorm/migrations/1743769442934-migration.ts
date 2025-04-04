import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743769442934 implements MigrationInterface {
  name = "Migration1743769442934";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "FKUserToken"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'active'`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT 'now()'`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ALTER COLUMN "observations" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD "user_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_5d25d8bbd6c209261dfe04558f1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_5d25d8bbd6c209261dfe04558f1"`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_11d81cd7be87b6f8865b0cf7661"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`
    );
    await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD "user_id" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ALTER COLUMN "observations" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "FKUserToken" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
